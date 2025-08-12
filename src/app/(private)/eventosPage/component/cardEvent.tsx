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
import { deleteModel } from 'mongoose';



/**@TYPES_PARA_ELEMENTOS */
// TYPES

// Interface das Propiedades que serão passadas através de props para outro component
type childrensProps = {
  _id: string;
  keyCard: React.Key;
  name: React.ReactNode;
  locaction: string;
  dateComplete: string | number;
  day: React.ReactNode;
  month: React.ReactNode;
  creator: React.ReactNode;
  onClick?: () => void;
  onDelete: (id: string) => void;
}

// Pega o Token do Usuário, para autentificação futura.
type TokenPayload = {
  userId: string
  email: string
  exp: number // tempo de expiração
}

/**@INTERFACE_PARA_JSX */
// INTERFACES
interface NumDeConfirmados {
  id: number,
  text: string,
  icon?: React.ReactNode
}


const ArrayInputsConfirmacao: NumDeConfirmados[] = [
  {
    id: 1,
    text: "Confirmar Presença"
  }
]



export default function CardEentsCustomized({ _id, name, locaction, creator, dateComplete, day, month, onDelete }: childrensProps) {
  // Mapeador/Encaminhador de Páginas
  const router = useRouter()

  // useStates
  const [loading, setLoading] = useState(true)
  const [menuIsOpen, setMenuIsOpen] = useState(true)
  const [numConfirmados, setNumConfirmados] = useState<number[]>([])


  /**@FUNÇÕES_VALIDADORAS */
  // Função que valida se o token está válido  e se o usuário está logado ou não
  function validade({ page }: { page: string }) {
    const token = localStorage.getItem('token');

    if (!token) {
      return router.push('/login');
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const agora = Date.now() / 1000;

      if (decoded.exp < agora) {
        localStorage.removeItem('token');
        return router.push('/login');
      }

      // Se `page` já contém o id do evento, manda só ele
      router.push(`/${page}`);

    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }

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


  /**@FUNÇÕES_QUE_INTERAGEM_COM_O_COMPONENTE */

  // Função que, ao ser chamada, pega os dados do card em que foi clicada, e leva
  // a uma Página com todos os dados somente do card em que ela foi chamada.
  const handleClick = () => {
    validade({ page: `editarEvento/${_id}` })
  };

  // funçao dos Inputs do card
  const handlesChange = (id: number, checked: boolean) => {
    setNumConfirmados(prev => {
      if (checked) {
        return [...prev, id]
      } else {
        return prev.filter(item => item !== id)
      }
    })
  }

  function cardMenu() {
    setMenuIsOpen(!menuIsOpen)

  }

  // SKELETON  DO SITE
  // Skeleton para animação de loading dos elementos
  if (loading) {
    return (
      <div className="w-full h-full">
        <SkeletonCard className="w-full" />
      </div>
    )
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let userEmail = null;


  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      userEmail = decoded.email;
    } catch {
      userEmail = null;
    }
  }

  const canDelete = userEmail && creator && userEmail === creator;


  return (
    <section >
      <div className="w-full relative ">
        <div className=' flex flex-col justify-between gap-2 lg:gap-0 md:max-w-[30vw] lg:max-w-[25vw] w-full
          min-h-[15dvh] p-5 rounded-xl'>

          <div className='flex flex-row flex-wrap gap-5' >
            <Card className={`min-w-[20rem] !max-w-[20rem] w-full md:w-[100rem] lg:max-w-[19rem] h-[23rem] bg-secondary p-0 flex flex-col justify-between pb-4`}
            // onClick={handleClick}
            >

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
                    <button className='cursor-pointer' onClick={cardMenu}><EllipsisVertical className='p-2 rounded-full size-8 bg-tertiary' /></button>
                  </div>
                </main>

                <footer className='flex justify-between border-t p-3'>
                  <p className="text-pink-700 dark:text-pink-300 font-bold">CommunityEvents</p>
                  <span className='text-green-700'>{numConfirmados.length} Confirmados...</span>
                </footer>
              </section>
            </Card >
          </div >
        </div >


        {
          menuIsOpen && (
            <div className='max-w-[12rem] w-full  absolute z-50 -mt-32 left-30  bg-secondary/60
            p-5  backdrop-blur border border-zinc-600  text-sm rounded-2xl'>

              <ul className='w-full h-full  flex flex-col gap-3 justify-center items-start'>
                {ArrayInputsConfirmacao.map((item) => (
                  <li className='flex gap-2 items-center' key={item.id}>
                    <input
                      checked={numConfirmados.includes(item.id)}
                      onChange={(e) => handlesChange(item.id, e.target.checked)}
                      type="checkbox"
                      id={`confirmar-presenca${item.id}`} />
                    <label htmlFor='confirmar-presenca'>{item.text}</label>
                  </li>
                ))}

                <li
                >
                  {canDelete && (
                    <button
                      onClick={() => onDelete(_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Deletar
                    </button>
                  )}
                </li>

              </ul>

            </div>
          )
        }




      </div >
    </section >
  )
}
