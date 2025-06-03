"use client"
import Card from "@/ui/Cards"
import { ArrowRight, Clock, MapPin, User, SquarePen, Share2, EllipsisVertical } from "lucide-react"

const Carousel = () => {
  return (
    <section className='w-full '>
      <h1 className="w-full px-1  text-2xl  flex justify-between mt-10 mb-5 font-bold">
        Proximos Eventos
        <span className=" flex items-center gap-1 text-sm text-text-secondary
            transition-all duration-300   hover:text-txttertiary-hover font-normal
">
          Ver Todos <ArrowRight className="size-5 font-normal" /></span>
      </h1>

      <div className='flex  flex-row flex-wrap gap-5'>
        {/* cards exemplo */}
        <Card className='w-full md:w-[100rem] lg:max-w-[19rem] border-l-4 border-bordercustomizada h-[22rem]
          bg-secondary p-0 flex flex-col justify-between pb-4 '>
          <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary  h-[15dvh]  '>
            <h1 className='font-bold  text-3xl'>25</h1>
            <p>MAI</p>
          </div>
          {/* lg:h-[15dvh] */}

          <section className='flex  flex-col h-full gap-3'>
            <main className=' flex flex-col justify-between p-3 h-full gap-3   '>
              <h1 className='font-bold text-xl'>Aniversario do Jão</h1>
              <ul className=' text-text-secondary '>
                <li className='flex  items-center  '><Clock className='h-4' />19:00 - 23:00</li>
                <li className='flex  items-center  '><MapPin className='h-4' />Restaurante Sabor & Arte</li>
                <li className='flex  items-center  '><User className='h-4 ' />Criado por: Tonny Ferreira</li>
              </ul>

              <div className='flex flex-row gap-2'>
                <button ><SquarePen className='p-2 rounded-full  size-8  bg-tertiary' /></button>
                <button ><Share2 className='p-2 rounded-full  size-8  bg-tertiary' /></button>
                <button ><EllipsisVertical className='p-2 rounded-full  size-8  bg-tertiary' /></button>
              </div>

            </main>

            <footer className='flex justify-between  border-t   p-3'>
              <p> imagens...</p>
              <span className='text-green-700'>8 Confirmados...</span>
            </footer>
          </section>
        </Card>

      </div>


    </section >



  )
}


export default Carousel
