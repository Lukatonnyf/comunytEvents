'use client';

// import Card, { CardEvents } from "./card";
import { BiPlus, BiSolidCameraPlus, BiSolidEnvelope } from "react-icons/bi";
import { ArrowRight } from "lucide-react";
import Card from "@/ui/Cards";
import Button from "@/ui/button";
import { useState } from "react";

export default function HomePage({ className }: { className: string }) {
  const [onMouse, setOnMouse] = useState<number | null>(null);
  return (

    <div className={`${className} w-full bg-bg-primary p-[30px]`}	>
      <Card >

        <div className="flex flex-col mb-[18px]">
          <h1 className=" text-[1.8rem] font-bold mb-[5px]">Bem vindo de volta, User!</h1>
          <p className="dark:text-gray-400  text-[1rem]">Dia da semana, Dia(Num) mês e ano atual </p>
        </div>


        <div className="flex flex-col flex-wrap gap-4 mt-2 sm:flex-row ">
          <Button className="bg-gradient-45  text-white">
            <span className="flex sm:justify-center items-center gap-2 ">
              <BiPlus className="w-4 h-4" /> Criar Evento
            </span>
          </Button>

          <Button>
            <span className="flex sm:justify-center items-center gap-2 ">
              <BiSolidEnvelope className="w-4 h-4" /> Enviar Convites
            </span>
          </Button>

          <Button className="bg-secondary">
            <span className="flex sm:justify-center items-center gap-2 ">
              < BiSolidCameraPlus className="w-4 h-4" /> Compartilhar Fotos
            </span>
          </Button>
        </div>
      </Card >

      {/* <Card title="Bem-vindo(a) de volta, User"
        description="Dia da semana, Dia(Num) mês e ano atual"
        buttons={[
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                < BiPlus className="w-4 h-4" /> Criar Evento
              </span>
            ),
            className: "text-start text-white bg-gradient-45  "
          },
          // button 2
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                <BiSolidEnvelope className="w-4 h-4 " /> Enviar Convite
              </span>
            ),
            className: "bg-tertiary text-sm text-start  "
          },
          // button 3
          {
            text: (
              <span className="flex sm:justify-center items-center gap-2 ">
                <BiSolidCameraPlus className="w-4 h-4" /> Compartilhar Fotos
              </span>
            ), className: "text-start   bg-tertiary text-sm "
          },

        ]}
      /> */}

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
