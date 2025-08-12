"use client"
import { useState, useEffect } from "react";

import SkeletonCard from '@/app/(private)/eventosPage/component/skeletonCard'
import Button from "@/ui/button";
import Card from "@/ui/Cards";
import CardEentsCustomized from "../component/cardEvent";

interface Evento {
  _id: string;
  name: string;
  email: string;
  location: string;
  date: string;    // string ISO vindo do backend
  typeEvent: 'public' | 'private',
  image?: string;
  creator?: string;
  criador?: string;
  onDelete?: (id: string) => void;
}

export default function EventosPage() {
  const [dados, setDados] = useState<Evento[]>([]);
  const [eventPublic, setEventPublic] = useState(true);
  const [eventPrivate, setEventPrivate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        console.log('Eventos recebidos:', data);
        setDados(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado.');
      return;
    }

    const res = await fetch(`/api/event/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const resEventos = await fetch('/api/event');
      const dataEventos = await resEventos.json();
      setDados(dataEventos);
    } else {
      const data = await res.json();
      alert(data.error || 'Erro ao deletar evento');
      console.error('Erro ao deletar evento:', data);
    }
  }
  async function limparEventosExpirados() {
    try {
      const response = await fetch('/api/cleanExpiredEvents');
      const data = await response.json();
      console.log(data.message || data.error);
      // Aqui você pode atualizar estado, mostrar mensagem para usuário, etc.
    } catch (error) {
      console.error('Erro ao chamar API:', error);
    }
  }

  useEffect(() => {
    limparEventosExpirados();
  }, []);

  // Função auxiliar para converter string ISO para Date com timezone de São Paulo
  const toDateSP = (isoString: string) => {
    return new Date(isoString); // no navegador, o objeto Date já considera o timezone do cliente
  };

  const publicEvents = dados.filter(evento => evento.typeEvent === 'public');

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-50 px-5">
      <Card className="w-full flex flex-row p-5 gap-5 max-w-[1240px]">
        <Button
          className={`${eventPublic ? 'bg-blue-600 text-white' : 'bg-gray-200 text-zinc-400'} px-4 py-2 rounded`}
          onClick={() => {
            setEventPublic(true);
            setEventPrivate(false);
          }}>
          Eventos Públicos
        </Button>
        <Button
          className={`${eventPrivate ? 'bg-blue-600 text-white' : 'bg-gray-200 text-zinc-400'} px-4 py-2 rounded`}
          onClick={() => {
            setEventPrivate(true);
            setEventPublic(false);
          }}>
          Eventos Privados
        </Button>
      </Card>

      <ul className="w-full flex flex-wrap md:gap-10 justify-center md:justify-start items-start max-w-[1240px]">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : (
            <>
              {(!publicEvents.length && !eventPrivate && eventPublic) &&
                dados.filter(item => item.typeEvent === 'public').map(item => (
                  <li className="w-[18rem] m-2" key={item._id}>
                    <CardEentsCustomized
                      _id={item._id}
                      keyCard={item._id}
                      name={item.name}
                      locaction={item.location}
                      day={new Date(item.date).toLocaleDateString("pt-BR", { day: '2-digit', timeZone: 'America/Sao_Paulo' })}
                      month={new Date(item.date).toLocaleDateString("pt-BR", { month: 'short', timeZone: 'America/Sao_Paulo' }).replace('.', '')}
                      dateComplete={new Date(item.date).toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}
                      creator={item.email}
                      onDelete={handleDelete}
                    />
                  </li>
                ))
              }

              {eventPublic && dados.filter(item => item.typeEvent === 'public').map(item => (
                <li className="w-[18rem] m-2" key={item._id}>
                  <CardEentsCustomized
                    _id={item._id}
                    keyCard={item._id}
                    name={item.name}
                    locaction={item.location}
                    day={new Date(item.date).toLocaleDateString("pt-BR", { day: '2-digit', timeZone: 'America/Sao_Paulo' })}
                    month={new Date(item.date).toLocaleDateString("pt-BR", { month: 'short', timeZone: 'America/Sao_Paulo' }).replace('.', '')}
                    dateComplete={new Date(item.date).toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}
                    creator={item.email}
                    onDelete={handleDelete}
                  />
                </li>
              ))}

              {eventPrivate && dados.filter(item => item.typeEvent === 'private').map(item => (
                <li key={item._id} className="w-[18rem] m-2">
                  <CardEentsCustomized
                    _id={item._id}
                    keyCard={item._id}
                    name={item.name}
                    locaction={item.location}
                    day={toDateSP(item.date).toLocaleDateString("pt-BR", { day: '2-digit', timeZone: 'America/Sao_Paulo' })}
                    month={toDateSP(item.date).toLocaleDateString("pt-BR", { month: 'short', timeZone: 'America/Sao_Paulo' }).replace('.', '')}
                    dateComplete={toDateSP(item.date).toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}
                    creator={item.email}
                    onDelete={handleDelete}
                  />
                </li>
              ))}
            </>
          )}
      </ul>
    </div>
  )
}
