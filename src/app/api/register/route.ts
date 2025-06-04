// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db } from 'mongodb'

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


export  async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();


  const db = await connectToDatabase(process.env.MONGODB_URI!);


  const collection = db.collection('users')

  const user = await collection.insertOne({
    name,
    email,
    password,
    subscribedAt: new Date(),
  })


const insertedId = user.insertedId


  return NextResponse.json(
    {
       ok: true,
       id: insertedId.toString(),
    },
    {status: 201}
  )
}


export async function GET() {
  return NextResponse.json({ env: process.env.MONGODB_URI || null });
}
