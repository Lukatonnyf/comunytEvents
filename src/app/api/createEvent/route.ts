// import { GerarSlug } from "@/utils/gerarSlug";
// import { GerarQRCODE } from "@/utils/gerarQRCode";

// import { NextRequest, NextResponse } from "next/server";

// let slugsCriados: string[] = []

// export default async function POST(req: NextRequest){
//  const {name} = await req.json()

//  if(!name) {
//   return new Response(JSON.stringify({erro: "Nome obrigatório"}),
//  {status: 400,}) }

//  let slugBase = await GerarSlug(name)
//  let slug = slugBase
//  let contador = 1;


//    while (slugsCriados.includes( slug)) {
//     slug = `${slugBase}-${contador++}`;
//   }

//     // slugsCriados.push(slug);

//   const link = `https://comunyt-events.vercel.app/createEvent/${slug}`
//   const qrCode = await GerarQRCODE(link)

//   return new Response(
//       JSON.stringify({ name, slug, link, qrCode }),
//     { status: 201 }
//   );

// }
