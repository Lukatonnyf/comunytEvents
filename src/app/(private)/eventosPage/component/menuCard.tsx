import ThemeSwitcher from "@/providers/theme-switcher";
import Card from "@/ui/Cards";
import router from "next/router";

export default function MenuCard() {
  return (
    <Card className="fixed  z-40 top-17 right-6 w-[16rem] h-[22rem]] p-5 gap-5">
      <h1 className="font-bold text-xl">Menu</h1>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row  gap-1 w-full ">
          <button
            // onClick={handleClick}
            className="rounded-sm bg-tertiary w-full py-4  transition-all duration-400 focus:bg-background  hover:bg-background">Minha conta</button>
          <button
            // onClick={goEvents}
            className="rounded-sm bg-tertiary w-full py-4 transition-all duration-400 focus:bg-background     hover:bg-background">Eventos</button>
        </div>
        <div className="flex flex-row gap-1 w-full">
          <button
            onClick={() => router.push('/')}
            className="rounded-sm  bg-tertiary w-full py-4 transition-all duration-400  focus:bg-background    hover:bg-background">Home</button>
          <button
            // onClick={exitAccount}
            className="rounded-sm bg-tertiary w-full py-4 transition-all duration-400 focus:bg-background  hover:bg-background">Sair</button>
        </div>

        <h1>Acessibilidade</h1>
        <div className="bg-none">
          <ThemeSwitcher />
        </div>
      </div>
    </Card>
  )
}
