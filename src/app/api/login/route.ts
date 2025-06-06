import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { stat } from "fs";

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string){
  if(cachedDb)
    return cachedDb

  const client = await MongoClient.connect(uri)
  const {pathname} = new URL(uri)
  const dbName = pathname?.substring(1)
  const db = client.db(dbName)
  cachedDb = db
  return db
}

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_ipermega_secreto'

export async function POST(request: NextRequest){
  const {email, password} = await request.json()

  if(!email || !password)
    return NextResponse.json({error: "Campos Faltando"}, {status: 400});

  const db = await connectToDatabase(process.env.MONGODB_URI!)
  const users = db.collection('users')

  const user = await users.findOne({email})
  if(!user)
    return NextResponse.json({error: 'Usuário não encontrado'}, {status: 404})

  // => Verificação de Senha
  const passwordMatch = await bcrypt.compare(password, user.password)
  if(!passwordMatch)
    return NextResponse.json({error: 'Senha incorreta'}, {status:401})



  const token = jwt.sign(
    {userId: user._id.toString(), email},
    JWT_SECRET,
    {expiresIn: '7d'}
  )

  return NextResponse.json({ok: true, token})
}


