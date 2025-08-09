/**@RETORNA_APENAS_O_EVENTO_CLICADO_PARA_A_PAGINA_DO_PaginaDoEvento */

import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const collection = db.collection('eventos');

    const evento = await collection.findOne({
      _id: new ObjectId(params.id)
    });

    if (!evento) {
      return NextResponse.json({ message: 'Evento não encontrado' }, { status: 404 });
    }

    return NextResponse.json(evento, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar evento', error },
      { status: 500 }
    );
  }
}
