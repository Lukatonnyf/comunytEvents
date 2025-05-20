'use client';
import AsideCard from "./components/asideCard";
import Header from "./components/header";


import HomePage from "./components/home";



export default function Home() {
  return (
    <div className="w-full h-screen  overflow-y-hidden bg-bg-primary flex flex-col">
      <Header />

      <div className="   flex flex-1 overflow-hidden  ">
        <AsideCard className=" md:flex-1  " />
        <HomePage className="md:flex-[6] overflow-y-auto h-full" />

      </div>


    </div >
  );
}
