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
import { useState } from 'react';
import Carousel from './carousel';


export default function HomePage({ className }: { className: string }) {
  const [showFormActivity, setShowFormActivity] = useState(false)

  function showForm() {
    setShowFormActivity(!showFormActivity)
  }

  const goToLoginPage = () => {
    window.location.href = '/login'
  }

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
            onClick={goToLoginPage}
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
