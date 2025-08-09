import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri);
  const { pathname } = new URL(uri);
  const dbName = pathname.substring(1);
  const db = client.db(dbName);

  cachedDb = db;
  return db;
}

export async function GET(req: NextRequest) {
  try {
    // Pega o ID da URL: /api/event/[id]
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // pega o último segmento da URL

    if (!id) {
      return NextResponse.json({ message: 'ID não fornecido' }, { status: 400 });
    }

    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const collection = db.collection('eventos');

    const evento = await collection.findOne({
      _id: new ObjectId(id)
    });

    if (!evento) {
      return NextResponse.json({ message: 'Evento não encontrado' }, { status: 404 });
    }

    return NextResponse.json(evento, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar evento', error: String(error) },
      { status: 500 }
    );
  }
}
