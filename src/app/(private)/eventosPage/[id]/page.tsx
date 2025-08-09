"use client"
// Import Hooks
import { useState, useEffect } from "react";

// Import Components
import SkeletonCard from '@/app/(private)/eventosPage/component/skeletonCard'
import Button from "@/ui/button";
import Card from "@/ui/Cards";
import CardEentsCustomized from "../component/cardEvent";


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

  // useEffect que faz o Fetch no BackEnd
  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        console.log('Eventos recebidos:', data);
        setDados(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      });;
  }, []);



  // Filtra os eventos para ser Publico
  const publicEvents = dados.filter(evento => evento.typeEvent === 'public');


  return (
    <div className="w-full h-full flex flex-col  justify-center items-center pt-50 px-5">
      {/* Buttons que alteram o tipo do  Evento de publico para privado, e vice e versa */}
      <Card className="w-full flex  flex-row p-5 gap-5 max-w-[1240px]">
        <Button
          className={`${eventPublic ? 'bg-blue-600 text-white' : 'bg-gray-200 text-zinc-400'} px-4 py-2 rounded`}
          onClick={() => {
            setEventPublic(true);
            setEventPrivate(false);
          }}>
          Eventos Publicos</Button>
        <Button
          className={`${eventPrivate ? 'bg-blue-600 text-white' : 'bg-gray-200 text-zinc-400'} px-4 py-2 rounded`}
          onClick={() => {
            setEventPrivate(true);
            setEventPublic(false);
          }}>
          Eventos Privados
        </Button>
      </Card>

      <ul className="w-full flex flex-wrap  md:gap-10 justify-center md:justify-start items-start max-w-[1240px]">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : (
            <>
              {/* Impede que a página de ventos fique vazia, sempre setando um valor default*/}
              {!publicEvents && !eventPrivate && eventPublic && (
                dados
                  .filter(item => item.typeEvent === 'public')
                  .map(item => (
                    <li className="w-[18rem] m-2" key={item._id}>
                      <CardEentsCustomized
                        _id={item._id}
                        keyCard={item._id}
                        name={item.name}
                        locaction={item.location}
                        dateComplete={new Date(item.hour).toLocaleString()}
                        day={new Date(item.hour).toLocaleDateString("pt-BR", { day: '2-digit' })}
                        month={new Date(item.hour).toLocaleDateString("pt-BR", { month: 'short' }).replace('.', '')}
                        creator={item.name}
                      />
                    </li>
                  ))
              )}

              {/* Eventos Publicos */}
              {eventPublic && dados
                .filter(item => item.typeEvent === 'public')
                .map(item => (
                  <li className="w-[18rem] m-2" key={item._id}>
                    <CardEentsCustomized
                      _id={item._id}
                      keyCard={item._id}
                      name={item.name}
                      locaction={item.location}
                      dateComplete={new Date(item.hour).toLocaleString()}
                      day={new Date(item.hour).toLocaleDateString("pt-BR", { day: '2-digit' })}
                      month={new Date(item.hour).toLocaleDateString("pt-BR", { month: 'short' }).replace('.', '')}
                      creator={item.name}
                    />
                  </li>
                ))}

              {/* Eventos Privados */}
              {eventPrivate && dados
                .filter(item => item.typeEvent === 'private')
                .map(item => (
                  <div key={item._id}>
                    <CardEentsCustomized
                      _id={item._id}
                      keyCard={item._id}
                      name={item.name}
                      locaction={item.location}
                      dateComplete={new Date(item.hour).toLocaleString()}
                      day={new Date(item.hour).toLocaleDateString("pt-BR", { day: '2-digit' })}
                      month={new Date(item.hour).toLocaleDateString("pt-BR", { month: 'short' }).replace('.', '')}
                      creator={item.name}
                    />

                  </div>
                ))}
            </>
          )
        }
      </ul>
    </div >
  )
}


