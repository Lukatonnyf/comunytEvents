import { Radio } from "lucide-react"
// import Image from "next/image"

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { InviteLinkInput } from "../components/invite-link";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EnviarConvites({ params }: PageProps) {
  const { id } = await params;

  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  if (!user) {
    return notFound();
  }

  const inviteLink = `http://localhost:3333/invites/${user._id}`

  return (

    <div className="min-h-dvh flex flex-col justify-center gap-16 p-5">
      <div className="flex flex-col gap-8 items-center md:items-start">
        {/* <Image src={"test"} alt="devstage" width={108.5} height={30} /> */}

        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          <span className="text-blue">CodeCraft</span> Summit 2025
        </h1>
      </div>

      {user.email}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
            Indique e ganhe
          </h2>
          <p className="text-gray-300">
            Convide mais pessoas para o evento e concorra a prêmios
            exclusivos! É só compartilhar o link abaixo e acompanhar as
            inscrições:
          </p>
        </div>
      </div>
      <InviteLinkInput inviteLink={inviteLink} />

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
            Crie eventos para os mais diversos tipos de pessoas, podendo  criar
            tanto publicos, quanto privados, apenas para os seus amigos mais próximos.

          </p>
        </div>

        {/* <SubscriptionForm /> */}
      </div>




    </div>
  )
}

