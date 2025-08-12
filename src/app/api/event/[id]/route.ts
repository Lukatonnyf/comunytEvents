import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_ipermega_secreto';
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


export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: "ID do evento é obrigatório" }, { status: 400 });
    }

    const eventObjectId = new ObjectId(id);

    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const collection = db.collection('eventos');

    // Tenta deletar direto pelo _id
    const result = await collection.deleteOne({ _id: eventObjectId });

    if (result.deletedCount === 1) {
      return NextResponse.json({ ok: true, message: "Evento deletado com sucesso" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }
  } catch (err) {
    console.error("Erro ao deletar evento:", err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
