"use client"
import { Bell, PersonStanding } from "lucide-react";
import { useState } from "react";
import MenuBar from "./components/menuBar";



export default function Header() {
  const [showMenuBar, setShowMenuBar] = useState(false);

  function teste() {
    setShowMenuBar(!showMenuBar)
  }

  return (
    <div className="bg-secondary w-full fixed z-10 dark:bg-secondary
  flex justify-between items-center h-16 px-3 border-b border-b-border sm:px-10">


      <div className="ml-auto flex justify-end items-center">
        <ul className="flex gap-2 items-center">
          <li className="bg-tertiary p-2 rounded-full dark:text-white">
            <Bell className="size-5" />
          </li>
          <li className="bg-tertiary p-2 rounded-full text-black">
            <PersonStanding
              className="p-1 rounded-full text-amber-50 size-5 bg-black dark:text-black dark:bg-white"
              onClick={teste}
            />
          </li>
        </ul>



        {showMenuBar && <MenuBar />}
      </div>
    </div >

  );
}
