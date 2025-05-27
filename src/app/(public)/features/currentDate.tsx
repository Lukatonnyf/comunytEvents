"use client"
import { useEffect, useState } from "react"
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

const DateCurrent = () => {
  const [date, setDate] = useState('')

  useEffect(() => {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const dateFormatted = formatter.format(now);
    const cap = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1)
    setDate(cap)
  }, [])

  return (
    <div>
      <p className={`dark:text-gray-400 text-[0.95rem] ${poppins.className} font-extalight`}>
        {date}</p >
    </div>
  )
}


export default DateCurrent;
