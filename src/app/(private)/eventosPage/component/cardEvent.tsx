"use client"

import { useEffect, useState } from "react"

import Card from "@/ui/Cards"
import { Clock, MapPin, User, SquarePen, Share2, EllipsisVertical } from "lucide-react"




interface childrensProps {
  keyCard: React.Key;
  name: React.ReactNode;
  locaction: React.ReactNode;
  description?: React.ReactNode;
  dateComplete: React.ReactNode;
  day: React.ReactNode;
  month: React.ReactNode;
  creator: React.ReactNode;
}


export default function CardEentsCustomized({ name, locaction, description, day, month, creator, dateComplete, keyCard }: childrensProps) {

  // const [dados, setDados] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        // setDados(data);
        setLoading(false)
      })
      .catch(
        (err) => {
          console.error(err)
          setLoading(false)
        });
  }, []);



  if (loading) return <div>Carregando</div>

  return (
    <section>
      <div className="w-full  ">
        <ul >
          <li key={keyCard}
            className='flex flex-col justify-between gap-2 md:max-w-[25vw] w-full
             min-h-[35dvh] p-5 rounded-xl  '>
            <div className='flex flex-row flex-wrap gap-5'>
              <Card
                className={`min-w-[17rem] w-full md:w-[100rem] lg:max-w-[19rem]  h-[23rem] bg-secondary p-0 flex flex-col justify-between pb-4`}>
                <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary h-[15dvh]'>

                  {/* Dia do Mês */}
                  <h1 className='font-bold text-3xl'>{day}</h1>
                  {/*  Mês do Ano */}
                  <p>{month}</p>
                </div>


                <section className='flex flex-col h-full gap-3'>
                  <main className='flex flex-col justify-between p-3 h-full gap-3'>
                    <h1 className='font-bold text-xl'>
                      {/* Nome do Evento */}
                      {name}
                    </h1>
                    <ul className='text-text-secondary'>
                      {/* Data completa */}
                      <li className='flex items-center'><Clock className='h-4' />{dateComplete}</li>
                      {/* Local do Evento */}
                      <li className='flex items-center'><MapPin className='h-4' />{locaction}</li>
                      {/* Criador do Evento */}
                      <li className='flex flex-col '>
                        <span className="flex items-center"><User className='h-4' />Criado por:</span>
                        <span className="border-l ml-1 pl-2 border-primary">{creator}</span>
                      </li>

                    </ul >

                    <div className='flex flex-row gap-2'>
                      <button><SquarePen className='p-2 rounded-full size-8 bg-tertiary' /></button>
                      <button><Share2 className='p-2 rounded-full size-8 bg-tertiary' /></button>
                      <button><EllipsisVertical className='p-2 rounded-full size-8 bg-tertiary' /></button>
                    </div>
                  </main >

                  <footer className='flex justify-between border-t p-3'>
                    <p>imagens...</p>
                    <span className='text-green-700'>8 Confirmados...</span>
                  </footer>
                </section >
              </Card >
            </div >
          </li >



        </ul >
      </div >
    </section >
  )
}
