// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db } from 'mongodb'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let cachedDb: Db | null = null;


async function connectToDatabase(uri: string){
  if(cachedDb){
    return cachedDb
  }


  const client = await MongoClient.connect(uri)

  const {pathname} =  new URL(uri)
  const dbName = pathname?.substring(1)
  const db = client.db(dbName)

  cachedDb = db;

  return db;

}

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto'


export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    console.log("📥 Dados recebidos:", { name, email, password });

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Campos faltando" }, { status: 400 });
    }

    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const users = db.collection("users");

    const userExists = await users.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "Usuário já existente" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const saveUser = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      subscribedAt: new Date(),
    });

    const token = jwt.sign(
      { userId: saveUser.insertedId.toString(), email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ ok: true, token, id: saveUser.insertedId.toString() }, { status: 201 });

  } catch (err) {
    console.error("🔥 Erro no register:", err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
