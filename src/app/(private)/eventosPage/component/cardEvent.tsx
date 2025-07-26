"use client"

import { useEffect, useState } from "react"

import Card from "@/ui/Cards"
import { Clock, MapPin, User, SquarePen, Share2, EllipsisVertical } from "lucide-react"
import SkeletonCard from "./skeletonCard";




interface childrensProps {
  keyCard: React.Key;
  name: React.ReactNode;
  locaction: string;
  dateComplete: React.ReactNode;
  day: React.ReactNode;
  month: React.ReactNode;
  creator: React.ReactNode;
}


export default function CardEentsCustomized({ name, locaction, day, month, creator, dateComplete, keyCard }: childrensProps) {
  const [loading, setLoading] = useState(true)

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



  if (loading) {
    return (
      <div className="w-full h-full">
        <SkeletonCard className="w-full" />
      </div>
    )
  }

  return (
    <section >
      < div className="w-full  " >
        <li
          className='flex flex-col justify-between gap-2 lg:gap-0 md:max-w-[30vw] lg:max-w-[25vw] w-full
                            min-h-[15dvh]  p-5 rounded-xl  '
        >

          <div className='flex flex-row flex-wrap gap-5'>
            <Card className={`min-w-[20rem] !max-w-[20rem] w-full md:w-[100rem] lg:max-w-[19rem]   h-[23rem]  bg-secondary p-0 flex flex-col justify-between pb-4
                            `}>

              <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary h-[15dvh]'>
                <h1 className='font-bold text-3xl'>25</h1>
                <p>MAI</p>
              </div>

              <section className='flex flex-col h-full gap-3'>
                <main className='flex flex-col p-3 h-full gap-3'>
                  <h1 className='font-bold text-xl'>{name}</h1>
                  <ul className='text-text-secondary'>
                    {/* Hora do evento */}
                    <li className='flex items-center'><Clock className='h-4' />{day}</li>
                    {/* Local do evento */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locaction)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <li className='flex items-center'><MapPin className='h-4' />{locaction}</li>
                    </a>
                    {/*Criador do Evento  */}
                    <li className='flex flex-col '>
                      <span className="flex items-center"><User className='h-4' />Criado por:</span>
                      <span className="border-l ml-1 pl-2 border-primary">{creator}</span>
                    </li>
                  </ul>

                  {/* TENHO QUE ARRUMAR ESSA PARTE FUTURAMENTE, PONDO FUNCIONALDIADE */}
                  {/* <div className='flex flex-row gap-2'>
                                      <button><SquarePen className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                      <button><Share2 className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                      <button><EllipsisVertical className='p-2 rounded-full size-8 bg-tertiary' /></button>
                                    </div> */}
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
