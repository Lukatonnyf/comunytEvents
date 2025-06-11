import { Radio } from "lucide-react"
// import Image from "next/image"

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { notFound } from 'next/navigation';


interface PageProps {
  params: {
    id: string;
  }
}

export default async function EnviarConvites({ params }: PageProps) {
  const { id } = params;

  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  if (!user) {
    return notFound();
  }

  return (

    <div className="min-h-dvh flex flex-col justify-center gap-16 p-5">
      <div className="flex flex-col gap-8 items-center md:items-start">
        {/* <Image src={"test"} alt="devstage" width={108.5} height={30} /> */}

        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          <span className="text-blue">CodeCraft</span> Summit 2025
        </h1>
      </div>

      {user.email}

      <div className="flex gap-5 items-stretch flex-col md:flex-row">
        <div className="flex-1 bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-gray-200 text-xl">
              Sobre o evento
            </h2>
            <span className="flex items-center gap-2 text-purple font-semibold text-xs">
              <Radio className="size-5" />
              AO VIVO
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Um evento feito por e para pessoas desenvolvedoras apaixonadas por
            criar soluções inovadoras e compartilhar conhecimento. Vamos
            mergulhar nas tendências mais recentes em desenvolvimento de
            software, arquitetura de sistemas e tecnologias emergentes, com
            palestras, workshops e hackathons.
            <br />
            <br />
            Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
          </p>
        </div>

        {/* <SubscriptionForm /> */}
      </div>
    </div>
  )
}

