"use client"

// Import Hoocks
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"

// Import Libs
import { jwtDecode } from 'jwt-decode'

// Import Components
import Card from "@/ui/Cards"
import SkeletonCard from "./skeletonCard";

// Import Icons
import { Clock, EllipsisVertical, MapPin, Share2, SquarePen, User } from "lucide-react"



// Interface das Propiedades que serão passadas através de props para outro component
interface childrensProps {
  _id: string;
  keyCard: React.Key;
  name: React.ReactNode;
  locaction: string;
  dateComplete: React.ReactNode;
  day: React.ReactNode;
  month: React.ReactNode;
  creator: React.ReactNode;
  onClick?: () => void;
}

// Pega o Token do Usuário, para autentificação futura.
type TokenPayload = {
  userId: string
  email: string
  exp: number // tempo de expiração
}





export default function CardEentsCustomized({ _id, name, locaction, creator, dateComplete, day, month }: childrensProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // useEffect que puxa os dados do BackEnd
  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(() => {
        setLoading(false)
      })
      .catch(
        (err) => {
          console.error(err)
          setLoading(false)
        });
  }, []);

  // Função que, ao ser chamada, pega os dados do card em que foi clicada, e leva
  // a uma Página com todos os dados somente do card em que ela foi chamada.
  const handleClick = () => {
    router.push(`/paginaDoEvento/${_id}`);
  };



  // Função que valida se o token está válido  e se o usuário está logado ou não
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



  // Skeleton para animação de loading dos elementos
  if (loading) {
    return (
      <div className="w-full h-full">
        <SkeletonCard className="w-full" />
      </div>
    )
  }

  return (
    <section >
      <div className="w-full">
        <li className='flex flex-col justify-between gap-2 lg:gap-0 md:max-w-[30vw] lg:max-w-[25vw] w-full
          min-h-[15dvh] p-5 rounded-xl'>

          <div className='flex flex-row flex-wrap gap-5' >
            <Card className={`min-w-[20rem] !max-w-[20rem] w-full md:w-[100rem] lg:max-w-[19rem] h-[23rem] bg-secondary p-0 flex flex-col justify-between pb-4`}
              onClick={handleClick}>

              {/* Header do Card */}
              <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary h-[15dvh]'>
                <h1 className='font-bold text-3xl'>{day}</h1>
                <p className='uppercase font-medium'>{month}</p>
              </div>

              {/* CONTEÚDO PRINCIPAL */}
              <section className='flex flex-col h-full gap-3'>
                <main className='flex flex-col p-3 h-full gap-3'>

                  {/* NOME DO EVENTO */}
                  <h1 className='font-bold text-xl'>{name}</h1>
                  <ul className='text-text-secondary'>

                    {/* Hora do evento */}
                    <li className='flex items-center'><Clock className='h-4' />{dateComplete}</li>

                    {/* LOCAL DO EVENTO */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locaction)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <li className='flex items-center'><MapPin className='h-4' />{locaction}</li>
                    </a>

                    {/* CRIADOR DO EVENTO */}
                    <li className='flex flex-col '>
                      <span className="flex items-center"><User className='h-4' />Criado por:</span>
                      <span className="border-l ml-1 pl-2 border-primary">{creator}</span>
                    </li>
                  </ul>

                  {/* TENHO QUE ARRUMAR ESSA PARTE FUTURAMENTE, PONDO FUNCIONALDIADE */}
                  <div className='flex flex-row gap-2'>
                    <button><SquarePen className='p-2 rounded-full size-8 bg-tertiary' /></button>
                    <button><Share2 className='p-2 rounded-full size-8 bg-tertiary' /></button>
                    <button><EllipsisVertical className='p-2 rounded-full size-8 bg-tertiary' /></button>
                  </div>
                </main>

                <footer className='flex justify-between border-t p-3'>
                  <p className="text-pink-700 dark:text-pink-300 font-bold">CommunityEvents</p>
                  {/* <span className='text-green-700'>8 Confirmados...</span> */}
                </footer>
              </section>
            </Card >
          </div >
        </li >

      </div >
    </section >
  )
}
