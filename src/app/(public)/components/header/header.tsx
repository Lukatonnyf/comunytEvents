"use client"
import { ArrowLeft, Bell, PersonStanding } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import MenuBar from "./components/menuBar";
import { useRouter } from "next/navigation";


export default function Header() {





  /**@TENHO_QUE_EXPORTAR_ESSE_SHOW_MENU => */ const [showMenuBar, setShowMenuBar] = useState(false);
  const showMenuBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenuBarRef.current && !showMenuBarRef.current.contains(event.target as Node)) {
        setShowMenuBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  function shoMenuFunction() {
    setShowMenuBar(!showMenuBar)
  }
  const router = useRouter();

  function returnPage() {
    const url = window.location.href
    if (url.includes("/profile/")) {
      router.push("/")
    } else {
      router.back()
    }
  }

  return (
    <div className="bg-secondary w-full fixed z-10 dark:bg-secondary
  flex justify-between items-center h-16 px-3 border-b border-b-border sm:px-10">
      <div className="hidden md:flex left-6">
        <button
          onClick={returnPage}
          className="
          bg-tertiary rounded-full p-2 z-50 smt-5 ml-5 transition-all duration-500 hover:bg-secondary"
        >
          <ArrowLeft className="size-5" />
        </button>
      </div>


      <div className="ml-auto flex justify-end items-center">
      </div>
      <ul className="flex gap-2 items-center">
        <li className="p-2 rounded-full   bg-tertiary
               transition-all duration-500 delay-200
             hover:bg-[linear-gradient(45deg,var(--color-gradient-start),var(--color-gradient-middle),var(--color-gradient-end))]">
          <Bell className="size-5" />
        </li>
        <li
          className={`p-2 rounded-full text-black
             bg-tertiary transition-all duration-500 delay-600
             hover:bg-[linear-gradient(45deg,var(--color-gradient-start),var(--color-gradient-middle),var(--color-gradient-end))]
             ${showMenuBar ? 'bg-[linear-gradient(45deg,var(--color-gradient-start),var(--color-gradient-middle),var(--color-gradient-end))]' : ''}
             `}

        >
          <PersonStanding
            className="p-1 rounded-full text-amber-50 size-5 bg-black dark:text-black dark:bg-white"
            onClick={shoMenuFunction}
          />
        </li>
      </ul>



      {showMenuBar && (
        <div ref={showMenuBarRef}>
          <MenuBar />
        </div>
      )}
    </div>

  );
}
