import { MongoClient, Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

const JWT_SECRET = process.env.JWT_SECRET || "segredo_ipermega_secreto";
let cachedDb: Db | null = null;

async function eventToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri);
  const { pathname } = new URL(uri);
  const dbName = pathname?.substring(1);
  const db = client.db(dbName);

  cachedDb = db;
  return db;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  let userId;
  let userEmail: string;

  if (!token) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      name: string;
      email: string;
    };

    ({ userId, email: userEmail } = decoded);

    if (!userId) {
      return NextResponse.json({ error: "ID de usuário não encontrado no token" }, { status: 401 });
    }
  } catch (err) {
    console.log("Token inválido:", err);
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }

  try {
    const { name, email, location, hour, date, typeEvent } = await request.json();

    if (!name || !email || !location || !hour || !date || !typeEvent) {
      return NextResponse.json({ error: "Campos faltando" }, { status: 400 });
    }

    // Desconstrução para criar date localmente
    const [year, month, day] = date.split("-").map(Number);
    const [hourNum, minuteNum] = hour.split(":").map(Number);

    // Cria a data local correta sem ajuste UTC
    const dateOnly = new Date(year, month - 1, day);
    const dateTime = new Date(year, month - 1, day, hourNum, minuteNum);

    const db = await eventToDatabase(process.env.MONGODB_URI!);
    const eventsCollection = db.collection("eventos");

    const saveEvents = await eventsCollection.insertOne({
      name,
      email,
      location,
      hour,        // salva hora como string "HH:mm"
      date: dateOnly,  // salva só a data no horário local (sem tempo)
      dateTime,    // opcional salvar data completa com hora
      typeEvent,
      creator: new ObjectId(userId),
      criador: userEmail ?? email,
    });

    console.log("evento salvo:", saveEvents.insertedId);

    return NextResponse.json({ ok: true, id: saveEvents.insertedId }, { status: 201 });
  } catch (err) {
    console.log("erro no servidor:", err);
    return NextResponse.json({ error: "erro interno no servidor" }, { status: 500 });
  }
}
