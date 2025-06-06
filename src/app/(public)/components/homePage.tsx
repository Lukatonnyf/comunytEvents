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
import Carousel from './carousel';

type TokenPayload = {
  userId: string
  email: string
  exp: number // tempo de expiração
}


export default function HomePage({ className }: { className: string; }) {
  const router = useRouter();



  const handleClick = () => {
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
      router.push(`/profile/${decoded.userId}`)
    } catch (error) {
      // Token inválido
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  return (
    <div className={`${className} mt-16
    w-full h-full min-h-0 bg-bg-primary p-[30px]`}	>
      <Card className=' w-full pb-5 px-5  pt-6 '>
        <div className="flex flex-col mb-[5px] text-start  ">
          <h1 className={`text-[1.8em] ${poppins.className} font-bold tracking-wide mb-[5px]   origin-left `}>
            Bem-vindo(a) de volta, User!
          </h1>
          <DateCurrent />
        </div>

        <div className="flex flex-col flex-wrap gap-4 mt-4 sm:flex-row ">
          <Button className="bg-gradient-45 text-white "
            // onClick={showForm}
            onClick={handleClick}
          >
            <span className="flex sm:justify-center  items-center gap-2 ">
              <BiPlus className={`w-4 h-4 ${poppins.className} font-light`} /> Criar Evento
            </span>
          </Button>

          <Button>
            <span className="flex sm:justify-center items-center gap-2 font-normal">
              <BiSolidEnvelope className={`w-4 h-4 ${poppins.className} font-medium`} /> Enviar Convites
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

      <Carousel />


    </div >



  )
}
