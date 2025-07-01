// "use client"
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
// import { InviteLinkInput } from "../components/invite-link";
import FormPage from '../components/formPage';
// import { InviteLinkInput } from '../components/invite-link';



interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EnviarConvites({ params }: PageProps) {

  // const event = await Event.create({
  //   title: "Churrasco da firma"
  //   date: new date
  // })


  const { id } = await params;

  const db = await connectToDatabase(process.env.MONGODB_URI!);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  if (!user) {
    return notFound();
  }

  // const inviteLink = `http://comunyt-events.vercel.app/createEvent/${user._id}`

  return (
    <div className="min-h-dvh flex flex-col justify-center gap-16 p-5">
      <section className="flex flex-col gap-8 justify-center items-center  mt-16 lg:flex-row">
        {/* <Image src={"test"} alt="devstage" width={108.5} height={30} /> */}
        <div className='flex-1'>
          <div>

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
                Convide as pessoas mais importantes para você e crie memórias incríveis!
                É só compartilhar o link abaixo e acompanhar as
                confirmações:
              </p>
            </div>
          </div>

        </div>


        <div className="flex flex-1 w-full justify-center items-center gap-5 flex-col ">
          {/* <InviteLinkInput inviteLink={inviteLink} /> */}


          <FormPage />
          {/* <SubscriptionForm /> */}
        </div >
      </section>
    </div >
  )
}

