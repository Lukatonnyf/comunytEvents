// // import { User, Mail } from "lucide-react";
// // import { register } from "module";
// // import { InputField, InputIcon, InputRoot } from "./components/input";
// // import { Stats } from "fs";
// import { InviteLinkInput } from "./components/invite-link";



// interface InvitePageProps {
//   params: Promise<{
//     subscriberId: string
//   }>
// }


// export default async function InviteForm(props: InvitePageProps) {
//   // const {subscriberId } = await

//   const username = "lukatonny"
//   const inviteLink = `http:localhost:3000/invites${username}`
//   return (
//     <div className="border border-amber-50 flex items-center justify-between gap-16 flex-col md:flex-row">
//       <div className="flex flex-col gap-10 w-full max-w-[550px]">
//         {/* <Image src={logo} alt="devstage" className="h-[30px] w-[108.5px]" /> */}

//         <div className="space-y-2">
//           <h1 className="text-4xl font-semibold font-heading text-gray-100 leading-none">
//             Inscrição confirmada!
//           </h1>
//           <p className="text-gray-300">
//             Para entrar no evento, acesse o link enviado para seu e-mail.
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
//               Indique e ganhe
//             </h2>
//             <p className="text-gray-300">
//               Convide mais pessoas para o evento e concorra a prêmios
//               exclusivos! É só compartilhar o link abaixo e acompanhar as
//               inscrições:
//             </p>
//           </div>
//         </div>

//         <InviteLinkInput inviteLink={inviteLink} />
//         {/*
//         <Stats subscriberId={subscriberId} /> */}
//       </div>

//       {/* <Ranking /> */}
//     </div>
//   )
// }
