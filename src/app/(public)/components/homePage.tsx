"use client"
import { Poppins } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ['latin'],

  weight: ['200', '400', '500', '700']
})
// import Card, { CardEvents } from "./card";
import { BiPlus, BiSolidCameraPlus, BiSolidEnvelope } from "react-icons/bi";
import { ArrowRight } from "lucide-react";
import Card from "@/ui/Cards";
import Button from "@/ui/button";
import DateCurrent from '../features/currentDate';

export default function HomePage({ className }: { className: string }) {
  return (
    <div className={`${className}
    w-full bg-bg-primary p-[30px]`}	>
      <Card>
        <div className="flex flex-col mb-[18px] text-start  ">
          <h1 className={`text-[1.8em] ${poppins.className} font-bold tracking-wide mb-[5px]   origin-left `}>
            Bem-vindo(a) de volta, User!
          </h1>
          <DateCurrent />
        </div>


        <div className="flex flex-col flex-wrap gap-4 mt-2 sm:flex-row ">
          <Button className="bg-gradient-45 text-white ">
            <span className="flex sm:justify-center  items-center gap-2 ">
              <BiPlus className={`w-4 h-4 ${poppins.className} font-light`} /> Criar Evento
            </span>
          </Button>

          <Button>
            <span className="flex sm:justify-center items-center gap-2 ">
              <BiSolidEnvelope className={`w-4 h-4 ${poppins.className} font-medium`} /> Enviar Convites
            </span>
          </Button>

          <Button className="bg-secondary">
            <span className="flex sm:justify-center items-center gap-2 ">
              < BiSolidCameraPlus className={`w-4 h-4 ${poppins.className} font-medium`} /> Compartilhar Fotos
            </span>
          </Button>
        </div>
      </Card >

      < section >
        <h1 className="w-full   text-2xl  flex justify-between  mt-10
        mb-5">
          Proximos Eventos
          <span className=" flex items-center gap-1  text-sm  text-primary">
            Ver Todos <ArrowRight className="size-5" /></span>
        </h1>

        {/* <CardEvents /> */}


      </section >

    </div >



  )
}
