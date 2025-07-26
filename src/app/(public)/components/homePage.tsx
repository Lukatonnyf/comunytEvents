"use client"
import { Poppins } from 'next/font/google'
// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ['latin'],

  weight: ['200', '400', '500', '700']
})
// import Card, { CardEvents } from "./card";
import { BiPlus, BiSolidCameraPlus, BiSolidEnvelope } from "react-icons/bi";

import Card from "@/ui/Cards";
import Button from "@/ui/button";
import DateCurrent from '../features/currentDate';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'

import Events from '../events/[id]/page';
import { useState, useEffect } from 'react';

type TokenPayload = {
  name: string,
  userId: string
  email: string
  exp: number // tempo de expiração
}


export default function HomePage({ className }: { className: string; }) {
  const router = useRouter();



  /**@VALIDATE_USER */
  //Função Valida se o Usuário está logado
  const validade = ({ page }: { page: string }) => {

    const token = localStorage.getItem('token')

    if (!token) {
      // Nenhum token: usuário não está logado
      return router.push('/login')
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token)

      const agora = Date.now() / 1000 // em segundos
      if (decoded.exp < agora) {
        // Token expirado
        localStorage.removeItem('token')
        return router.push('/login')
      }

      // Usuário está logado → redirecionar
      router.push(`/${page}/${decoded.userId}`)
    } catch {
      // Token inválido
      localStorage.removeItem('token')
      router.push('/login')
    }
  }


  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log("[TOKEN]", token)

    if (!token) return

    try {
      const decoded = jwtDecode<TokenPayload>(token)
      console.log("[DECODED]", decoded)

      const agora = Date.now() / 1000
      if (decoded.exp < agora) {
        console.log("[EXPIRED TOKEN]", decoded.exp, "<", agora)
        localStorage.removeItem('token')
        return
      }

      setUserName(decoded.name)
    } catch (err) {
      console.error("[ERRO NO DECODE]", err)
      localStorage.removeItem('token')
    }
  }, [])



  /**@EVENTS_BUTTONS */
  // Button leva para Criar evento
  const createInvite = () => {
    validade({ page: "createEvent" })
  }

  const verEventos = () => {
    validade({ page: "eventosPage" })
  }



  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  return (
    <div className={`${className} mt-16
    w-full h-full min-h-0 bg-bg-primary p-[30px]`}	>
      <Card className=' w-full pb-5 px-5  pt-6 '>
        <div className="flex flex-col mb-[5px] text-start  ">
          <h1 className={`text-[1.8em] ${poppins.className} font-bold tracking-wide mb-[5px]   origin-left `}>
            Bem-vindo(a) de volta, {userName ? ` ${userName}!` : "User!"}
          </h1>
          <DateCurrent />
        </div>

        <div className="flex flex-col flex-wrap gap-4 mt-4 sm:flex-row ">
          <Button className="bg-gradient-45 text-white "
            // onClick={showForm}
            onClick={createInvite}
          >
            <span className="flex sm:justify-center  items-center gap-2 ">
              <BiPlus className={`w-4 h-4 ${poppins.className} font-light`}
                onClick={createInvite}
              /> Criar Evento
            </span>
          </Button>

          <Button
            onClick={verEventos}
          >
            <span className="flex sm:justify-center items-center gap-2 font-normal">
              <BiSolidEnvelope className={`w-4 h-4 ${poppins.className} font-medium`} /> Ver Eventos
            </span>
          </Button>

          <Button className="bg-secondary">
            <span className="flex sm:justify-center items-center gap-2  font-normal ">
              < BiSolidCameraPlus className={`w-4 h-4 ${poppins.className} font-medium`} /> Compartilhar Fotos
            </span>
          </Button>
        </div>
      </Card>


      {/* {showFormActivity && <Form showForm={showForm} />} */}

      {/* <Carousel /> */}
      <Events />

    </div >



  )
}
