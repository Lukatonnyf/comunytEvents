"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Evento {
  _id: string;
  keyCard: React.Key;
  name: React.ReactNode;
  email: string;
  locaction: string;
  dateComplete: React.ReactNode;
  day: React.ReactNode;
  month: React.ReactNode;
  creator: React.ReactNode;
}

export default function PaginaDoEvento() {

  const [evento, setEvento] = useState<Evento | null>(null)


  useEffect(() => {
    if (!id) return;

    fetch(`/api/event/${id}`) // busca apenas o clicado
      .then(res => res.json())
      .then(data => setEvento(data))
      .catch(err => console.error(err));
  }, []);

  const params = useParams();
  const id = params?.id;

  console.log(id)


  return (
    <div className='flex h-full border '>


      <div className='mt-50'>

        <p >{evento?.name}</p>
        {evento?.email}
      </div>
    </div>
  );
}
