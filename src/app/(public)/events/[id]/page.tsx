"use client"

import { useEffect, useState } from "react"

import Card from "@/ui/Cards"
import { ArrowRight, Clock, MapPin, User, SquarePen, Share2, EllipsisVertical } from "lucide-react"
import Button from "@/ui/button"

import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'
import SkeletonCard from "@/app/(private)/eventosPage/component/skeletonCard"

// import Events from '../events/[id]/page';

type TokenPayload = {
  userId: string
  email: string
  exp: number // tempo de expiração
}

interface Evento {
  _id: string;
  name: string;
  email: string;
  location: string;
  hour: Date | string;
  image?: string;
  creator?: string;
  criador?: string;
}




export default function Events() {
  const [dados, setDados] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true)
  const [visible] = useState(5);

  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setLoading(false)
      })
      .catch(
        (err) => {
          console.error(err)
          setLoading(false)
        });
  }, []);


  // validação pra criar evento:

  const router = useRouter();

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

  // const handleClick = () => {
  //   validade({ page: "profile" })
  // }

  const createInvite = () => {
    validade({ page: "createEvent" })
  }



  return (
    <section className='w-full flex flex-col' >
      <h1 className="w-full px-1 text-2xl flex justify-between mt-10 mb-5 font-bold">
        Próximo Evento
        <span className="flex items-center gap-1 text-sm text-text-secondary transition-all duration-300 hover:text-txttertiary-hover font-normal">
          Ver Todos <ArrowRight className="size-5 font-normal" />
        </span>
      </h1>

      <div className="flex flex-row">
        {
          loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : (

              <>
                <div className="overflow-x-hidden ">
                  <ul className="flex overflow-auto ">
                    {
                      dados.length > 0 ? (
                        dados.slice(0, visible).map((item, i) => (
                          <li
                            className='flex flex-col justify-between gap-2 md:max-w-[25vw] w-full
                            min-h-[35dvh] p-5 rounded-xl '
                            key={item._id}>

                            <div className='flex flex-row flex-wrap gap-5'>
                              <Card className={`min-w-[17rem] w-full md:w-[100rem] lg:max-w-[19rem]   h-[23rem] bg-secondary p-0 flex flex-col justify-between pb-4
                                ${i === 0 ? "border-l-4 border-bordercustomizada" : "border-none "}
                                `}>

                                <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary h-[15dvh]'>
                                  <h1 className='font-bold text-3xl'>25</h1>
                                  <p>MAI</p>
                                </div>

                                <section className='flex flex-col h-full gap-3'>
                                  <main className='flex flex-col justify-between p-3 h-full gap-3'>
                                    <h1 className='font-bold text-xl'>{item.name}</h1>
                                    <ul className='text-text-secondary'>
                                      <li className='flex items-center'><Clock className='h-4' />{new Date(item.hour).toLocaleDateString()}</li>
                                      <li className='flex items-center'><MapPin className='h-4' />{item.location}</li>
                                      <li className='flex flex-col '>
                                        <span className="flex items-center"><User className='h-4' />Criado por:</span>
                                        <span className="border-l ml-1 pl-2 border-primary">{item.criador}</span>
                                      </li>

                                    </ul>

                                    <div className='flex flex-row gap-2'>
                                      <button><SquarePen className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                      <button><Share2 className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                      <button><EllipsisVertical className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                    </div>
                                  </main>

                                  <footer className='flex justify-between border-t p-3'>
                                    <p>imagens...</p>
                                    <span className='text-green-700'>8 Confirmados...</span>
                                  </footer>
                                </section>
                              </Card>
                            </div>
                          </li>

                        ))) : (
                        <>
                          <div className='col-span-full   flex flex-col justify-center items-center'>
                            <div className='flex flex-col  justify-center items-center'>
                              <p className='font-semibold text-2xl'>Carregando Eventos....</p>
                              <Button onClick={createInvite}>Caso não possua eventos, crie-os aqui! </Button>
                            </div>
                          </div >
                        </>
                      )
                    }
                  </ul>
                </div>
              </>)
        }
      </div>

    </section >
  )
}
