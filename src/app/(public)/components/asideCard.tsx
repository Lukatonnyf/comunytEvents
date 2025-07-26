'use client'

import { jwtDecode } from "jwt-decode";
import { Calendar, Home, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { BiNotification, BiPlus, BiCalendar } from "react-icons/bi";

interface AsideCardProps {
  className?: string;
}

interface TokenPayload {
  exp: number;
  userId: string;
}

interface MenuItem {
  id: number;
  icon: ReactNode;
  name: string;
  page?: string; // opcional
}

export default function AsideCard({ className }: AsideCardProps) {
  const router = useRouter();
  const [isActiveItem, setIsActiveItem] = useState(1);

  const validade = (page: string) => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const agora = Date.now() / 1000;
      if (decoded.exp < agora) {
        localStorage.removeItem('token');
        return router.push('/login');
      }
      router.push(`/${page}/${decoded.userId}`);
    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const menuItems: MenuItem[] = [
    { id: 1, icon: <Home />, name: "Inicio", page: "" },
    { id: 2, icon: <Calendar />, name: "Eventos", page: "eventosPage" },
    { id: 3, icon: <BiPlus />, name: "Novo Evento", page: "createEvent" },
    // { id: 4, icon: <BiNotification />, name: "Notificações", page: "notificacoesPage" },
    // { id: 5, icon: <Settings />, name: "Configurações", page: "configuracoesPage" },
  ];

  return (
    <aside className={` ${className} hidden relative z-20 bg-secondary md:flex flex-col w-[16.666vw] min-h-screen border-r border-r-border`}>
      <header className="flex items-center gap-2 text-xl font-bold p-5 border-b h-16">
        <BiCalendar className="text-primary text-3xl" /> CommunityEvent
      </header>

      <ul className="px-5 py-5 flex flex-col gap-5 h-full">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setIsActiveItem(item.id);
              if (item.page !== undefined) validade(item.page);
            }}
            className={`flex flex-row items-center gap-2 text-lg px-3 py-2  rounded-lg hover:bg-tertiary hover:text-primary cursor-pointer ${item.id === isActiveItem
              ? "bg-gradient-45 text-white shadow-lg"
              : "text-zinc-400"
              }`}
          >
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
