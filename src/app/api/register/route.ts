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


export  async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if(!name || !email || !password)
  return NextResponse.json({error: 'Campos faltando'}, {status: 400})

  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const users = db.collection('users')


  const userExists = await users.findOne({email})
  if(userExists)
  return NextResponse.json({error: "Usuário já existente"}, {status: 409})

  // => A linha abaixo ciptografa a senha.
  const hashedPassword = await bcrypt.hash(password, 10)
  // => Cria e salva o usuário no BD
  const saveUser = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    subscribedAt: new Date(),
  })

  // => Cria o Token JWT junto com o id do usuário
  const token = jwt.sign(
    { userId: saveUser.insertedId, email},
    JWT_SECRET,
    {expiresIn: '7d'}
  )


return NextResponse.json({
  ok: true,
  token,
  id: saveUser.insertedId.toString(), // 👈 aqui está o ID do usuário
}, { status: 201 });
}


export async function GET() {
  return NextResponse.json({ env: process.env.MONGODB_URI || null });
}
