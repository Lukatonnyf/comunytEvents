import { connectToDatabase } from '@/lib/mongodb'; // seu arquivo de conexão com Mongo
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI!);
    const collection = db.collection('eventos');

    const now = Date.now();
    const events = await collection.find({}).toArray();

    const expiredEventIds = events
      .filter(event => {
        const eventDate = new Date(event.hour).getTime();
        const expirationDate = eventDate + 3 * 24 * 60 * 60 * 1000;
        return expirationDate < now;
      })
      .map(event => event._id);

    if (expiredEventIds.length === 0) {
      return NextResponse.json({ message: 'Nenhum evento expirado para deletar' });
    }

    const result = await collection.deleteMany({ _id: { $in: expiredEventIds } });

    return NextResponse.json({ message: `Deletados ${result.deletedCount} eventos expirados` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao limpar eventos expirados' }, { status: 500 });
  }
}
