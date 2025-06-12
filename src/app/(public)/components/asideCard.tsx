"use client"
import { Calendar, Home, Settings } from "lucide-react";
import { ReactNode, useState } from "react";
import { BiNotification, BiPlus } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";

interface AsideCardProps {
  className?: string;
}

interface Menus {
  id: number,
  icon: ReactNode,
  name: string,
  url: string
}

const ArrayMenu: Menus[] = [
  {
    id: 1,
    icon: <Home />,
    name: "Inicio",
    url: ""
  },
  {
    id: 2,
    icon: <Calendar />,
    name: "Calendário",
    url: ""
  },
  {
    id: 3,
    icon: <BiPlus />,
    name: "Novo Evento",
    url: ""
  },
  {
    id: 4,
    icon: <BiNotification />,
    name: "Notificações",
    url: ""
  },
  {
    id: 5,
    icon: <Settings />,
    name: "Configurações",
    url: ""
  }
]

export default function AsideCard({ className }: AsideCardProps) {
  const [isActiveItem, setIsActiveItem] = useState(1)

  return (


    <aside className={` ${className} hidden  relative z-20 bg-secondary md:flex flex-col w-[16.666vw] min-h-screen
     h-full  border-r  border-r-border`}>
      <header className=" flex  items-center  gap-2 text-xl font-bold p-5 border-b h-16">
        <BiCalendar className="text-primary text-3xl" /> CommunityEvent
      </header>


      <ul className="px-5 py-5  flex flex-col gap-5 h-full '">
        {
          ArrayMenu.map((item, i) => (
            <li
              onClick={() => setIsActiveItem(item.id)}
              className={`flex flex-row items-center gap-2
                text-lg
                px-3 py-2 rounded-lg
                hover:bg-tertiary hover:text-primary
                cursor-pointer ${item.id === isActiveItem
                  ? "bg-gradient-45 text-white shadow-lg"
                  : "text - gray - 800"
                }`}
              key={i}>
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </li>
          ))
        }

      </ul>

    </aside >
  )

}


