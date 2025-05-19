'use client';

import Card, { CardEvents } from "./cards";


import { BiPlus, BiSolidCameraPlus, BiSolidEnvelope } from "react-icons/bi";
import { ArrowRight } from "lucide-react";

export default function HomePage({ className }: { className: string }) {

  return (

    <div className={`${className} w-full h-screen   bg-bg-primary  p-[30px]`}	>
      <Card title="Bem-vindo(a) de volta, User"

        description="Dia da semana, Dia(Num) mês e ano atual"
        buttons={[
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                < BiPlus className="w-4 h-4" /> Criar Evento
              </span>
            ),
            className: "text-start bg-gradient-45 text-white hover:bg-bg-primary"
          },
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                <BiSolidEnvelope className="w-4 h-4 " /> Enviar Convite
              </span>
            ),
            className: "bg-bg-tertiary text-sm   hover:bg-bg-primary"
          },
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                <BiSolidCameraPlus className="w-4 h-4" /> Compartilhar Fotos
              </span>
            ), className: "text-start  text-white r bg-bg-tertiary text-sm text-white hover:bg-bg-primary"
          },

        ]}
      />

      <section>
        <h1 className="w-full text-white  text-2xl  flex justify-between  mt-10">Proximos Eventos
          <span className=" flex items-center gap-1  text-sm  text-text-secondary">Ver Todos <ArrowRight className="size-5" /></span>
        </h1>

        <CardEvents />
      </section>

    </div >



  )
}
