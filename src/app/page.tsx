'use client';
import AsideCard from "./components/asideCard";
import Header from "./components/header";


import HomePage from "./components/home";



export default function Home() {
  return (
    <div className="w-full h-screen   bg-bg-primary ">
      <Header />

      <div className=" border  flex flex-wrap ">
        <AsideCard className="md:min-w-[20.83vw] md:flex-1 " />
        <HomePage className="md:flex-6 md:min-w-[300px] " />

      </div>
    </div >
  );
}
