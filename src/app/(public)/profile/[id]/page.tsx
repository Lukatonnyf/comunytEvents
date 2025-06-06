import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;

  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  if (!user) {
    return notFound(); // ou componente JSX com mensagem de erro
  }

  return (
    <div className="flex flex-col h-screen">
      <section className="flex justify-center items-baseline h-full mt-16 p-5">
        <div className="flex gap-5 bg-secondary rounded-md container mx-auto max-w-3xl py-8 px-4">
          <div>
            <Image
              src="/defaul.webp"
              alt="test"
              width={200}
              height={50}
              className="w-32 h-32 border rounded-full"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="flex flex-col font-bold text-xl uppercase">
              {user.name}
              <span className="text-sm font-normal dark:text-gray-400 normal-case">
                {user.email}
              </span>
            </p>
            <p className="normal-case dark:text-gray-400">
              Cadastrado em: {new Date(user.subscribedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
