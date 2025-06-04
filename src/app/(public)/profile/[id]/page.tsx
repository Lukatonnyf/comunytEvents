import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

// interface User {
//   _id: string,
//   name: string,
//   emai: string,
//   subscribedAt: string
// }

type PageParams = {
  id: string;
};

// Usar a tipagem inline para os props
export default async function ProfilePage({ params }: { params: Promise<PageParams> }) {

  const resolvedParams = await params;
  const { id } = resolvedParams

  const db = await connectToDatabase(process.env.MONGODB_URI!)
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) })


  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  return (
    <div>
      <h1>Perfil do usuário</h1>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Cadastrado em: {new Date(user.subscribedAt).toLocaleDateString()}</p>
    </div>
  )
}
