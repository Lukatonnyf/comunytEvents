"use client"

import Card from "@/ui/Cards";

import ThemeSwitcher from "@/providers/theme-switcher";
import { jwtDecode } from 'jwt-decode'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";




type TokenPayload = {
  userId: string
  email: string
  exp: number // tempo de expiração
}


const MenuBar = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // => Esse useEffect define que o componente está montado no client (browser),
  // ou seja, ele está evitando bug/conflitos de render, defininto q está página
  // é uma CSR.
  useEffect(() => {
    setIsClient(true);
  }, []);




  const handleClick = () => {
    if (!isClient) return;
    const token = localStorage.getItem('token')

    if (!token) {
      // Caso o token não exista, ou esteja inválido, o usuário vai pra página
      // de login
      return router.push('/login')
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token)

      const agora = Date.now() / 1000 // => Pega o horário real, converte em
      // milissegundos, para comparar com o tempo do token, para validar se o
      // token está valido ou não

      if (decoded.exp < agora) {
        // => caso o tempo atual seja maior do que o tempo definido no token,
        // será "token inválido", e o usuário será redirecionado automáticamente
        // para a página de login
        localStorage.removeItem('token')
        return router.push('/login')
      }

      // Se o Usuário estiver logado, será redirecionado para uma página de seu
      // perfil
      router.push(`/profile/${decoded.userId}`)
    } catch {
      // Caso o token seja inválido, por qualquer outro motivo, será levado para
      // a página de login Imediatamente.
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  const pathname = usePathname();





  function exitAccount() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        jwtDecode<TokenPayload>(token);
        localStorage.removeItem('token');
      }


    } catch {
      localStorage.removeItem('token');
    }


    if (pathname.startsWith("/profile")) {
      router.push("/");
    }
  }


  return (
    <Card className="fixed  z-40 top-17 right-6 w-[16rem] h-[22rem]] p-5 gap-5">
      <h1 className="font-bold text-xl">Menu</h1>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row  gap-1 w-full ">
          <button
            onClick={handleClick}
            className="rounded-sm bg-tertiary w-full py-4  transition-all duration-400  hover:bg-background">Minha conta</button>
          <button className="rounded-sm bg-tertiary w-full py-4 transition-all duration-400   hover:bg-background">Eventos</button>
        </div>
        <div className="flex flex-row gap-1 w-full">
          <button className="rounded-sm  bg-tertiary w-full py-4 transition-all duration-400   hover:bg-background">Galeria</button>
          <button
            onClick={exitAccount}
            className="rounded-sm bg-tertiary w-full py-4 transition-all duration-400   hover:bg-background">Sair</button>
        </div>

        <h1>Acessibilidade</h1>
        <div className="bg-none">
          <ThemeSwitcher />
        </div>
      </div>
    </Card>
  )

}

export default MenuBar;
