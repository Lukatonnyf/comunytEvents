"use client"
import { useState, useEffect } from "react";

// import { useRouter } from 'next/navigation';
// import { jwtDecode } from 'jwt-decode'
import SkeletonCard from '@/app/(private)/eventosPage/component/skeletonCard'
import Button from "@/ui/button";
import Card from "@/ui/Cards";
import CardEentsCustomized from "../component/cardEvent";



// type TokenPayload = {
//   userId: string
//   email: string
//   exp: number // tempo de expiração
// }

interface Evento {
  _id: string;
  name: string;
  email: string;
  location: string;
  hour: Date | string;
  typeEvent: 'public' | 'private',
  image?: string;
  creator?: string;
  criador?: string;
}


export default function EventosPage() {

  const [dados, setDados] = useState<Evento[]>([]);
  const [eventPublic, setEventPublic] = useState(true)
  const [eventPrivate, setEventPrivate] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        setDados(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      });;
  }, []);

  // const router = useRouter();

  // const validade = ({ page }: { page: string }) => {

  //   const token = localStorage.getItem('token')

  //   if (!token) {
  //     // Nenhum token: usuário não está logado
  //     return router.push('/login')
  //   }

  //   try {
  //     const decoded = jwtDecode<TokenPayload>(token)

  //     const agora = Date.now() / 1000 // em segundos
  //     if (decoded.exp < agora) {
  //       // Token expirado
  //       localStorage.removeItem('token')
  //       return router.push('/login')
  //     }

  //     // Usuário está logado → redirecionar
  //     router.push(`/${page}/${decoded.userId}`)
  //   } catch {
  //     // Token inválido
  //     localStorage.removeItem('token')
  //     router.push('/login')
  //   }
  // }

  const publicEvents = dados.filter(evento => evento.typeEvent === 'public');
  // You can use publicEvents as needed, e.g., set state or log
  console.log(publicEvents);

  return (
    <div className="w-full h-full flex flex-col  bg-red-500 justify-center items-center pt-50">

      <Card>
        <Button onClick={() => {
          setEventPublic(!eventPublic)
          setEventPrivate(false)
        }}>
          Eventos Publicos</Button>
        <Button
          onClick={() => {
            setEventPrivate(!eventPrivate)
            setEventPublic(false)
          }}>
          Eventos Privados
        </Button>
      </Card>

      <ul className="w-ful flex  flex-wrap justify-start items-center max-w-[1240px] ">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : (
            <>
              {/* Eventos Públicos */}
              {eventPublic && dados
                .filter(item => item.typeEvent === 'public')
                .map(item => (
                  <CardEentsCustomized
                    key={item._id}
                    keyCard={item._id}
                    name={item.name}
                    locaction={item.location}
                    dateComplete={new Date(item.hour).toLocaleString()}
                    day={new Date(item.hour).toLocaleDateString("pt-BR", { day: '2-digit' })}
                    month={new Date(item.hour).toLocaleDateString("pt-BR", { month: 'short' })}
                    creator={item.creator}
                  />
                ))}

              {/* Eventos Privados */}
              {eventPrivate && dados
                .filter(item => item.typeEvent === 'private')
                .map(item => (
                  <div key={item._id}>
                    <CardEentsCustomized
                      keyCard={item._id}
                      name={item.name}
                      locaction={item.location}
                      dateComplete={new Date(item.hour).toLocaleString()}
                      day={new Date(item.hour).toLocaleDateString("pt-BR", { day: '2-digit' })}
                      month={new Date(item.hour).toLocaleDateString("pt-BR", { month: 'short' })}
                      creator={item.creator}
                    />
                    <p className="bg-red-500">{item.typeEvent}</p>
                  </div>
                ))}
            </>
          )
        }



      </ul>
    </div >
  )
}


