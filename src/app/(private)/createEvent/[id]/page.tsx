// "use client"
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { InviteLinkInput } from "../components/invite-link";
import FormPage from '../components/formPage';




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

  const inviteLink = `http://comunyt-events.vercel.app/createEvent/${user._id}`

  return (

    <div className="min-h-dvh flex flex-col justify-center gap-16 p-5">
      <div className="flex flex-col gap-8 items-center md:items-start">
        {/* <Image src={"test"} alt="devstage" width={108.5} height={30} /> */}

        <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
          <span className="text-blue">Community</span> Events
        </h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
            Crie seus Eventos
          </h2>
          <p className="text-gray-300">
            Convide as pessoas mais importantes para você e crie memóriasincríveis!
            É só compartilhar o link abaixo e acompanhar as
            confirmações:
          </p>
        </div>
      </div>


      <div className="flex gap-5 items-stretch flex-col md:flex-row">
        <InviteLinkInput inviteLink={inviteLink} />
        <FormPage />
        {/* <SubscriptionForm /> */}
      </div >




    </div >
  )
}

