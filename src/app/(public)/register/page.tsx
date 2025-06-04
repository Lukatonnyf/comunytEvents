"use client"

import axios from 'axios'
import { FormWrapper } from "@/providers/ui/formWrapper";
import Button from "@/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Login() {
  return <Form />
}

function Form() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (data: FormValues) => {
    console.log("Dados que serão enviados para a API:", data);
    if (confirmPassword === password) {
      try {
        const response = await axios.post('/api/register', data);
        console.log('Resposta da API:', response.data, { text: "foifoi" });


        if (response.data.ok) {
          const userId = response.data.id;
          router.push(`/profile/${userId}`);
        }
      } catch (error) {
        // Se o erro for 400, o log do erro do Axios pode ser útil também
        if (axios.isAxiosError(error)) {
          console.error('Erro Axios:', error.response?.data || error.message);
        } else {
          console.error('Erro ao enviar dados:', error);
        }
      }
    } else {
      console.log("As senhas não Coecidem")
    }
  };


  const loginAccount = () => {
    window.location.href = '/login'
  }


  const router = useRouter();




  return (
    <div>

      <div>
        <button
          onClick={() => router.back()}
          className='bg-tertiary  rounded-full  p-2 mt-5 ml-5
        transition-all duration-500
        hover:bg-secondary '><ArrowLeft className='size-5 ' /></button>
      </div>

      <FormWrapper<FormValues>
        defaultValues={{ name: "", email: "", password: "", confirmPassword: "" }}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
      w-6/7 lg:w-[35rem] p-5 gap-5 bg-secondary rounded-xl"
      >
        {({ register }) => (
          <div className="w-full flex flex-col gap-5">
            <section>
              <h1>Criar Conta</h1>
            </section>

            <label className="w-full flex flex-col gap-2">
              Digite Seu nome
              <input
                required
                {...register("name")}
                placeholder="Digite o seu nome de usuário ( username )"
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>



            <label className="w-full flex flex-col gap-2">
              Cadastrar Email
              <input
                required
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex simples para validar email
                    message: "Email inválido"
                  }
                })}
                placeholder="Cadastre um email "
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>

            <label className="w-full flex flex-col gap-1">
              Senha
              <input
                type="password"
                required
                {...register("password")}
                min={5}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crie uma senha para sua conta"
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>

            <label className="w-full flex flex-col gap-1">
              Confirmar Senha
              <input
                type="password"
                required
                min={5}
                {...register("confirmPassword")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua Senha"
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>


            <div className="flex flex-row-reverse mt-10 gap-x-5">

              <Button
                type="submit"
                className="bg-gradient-45 text-white rounded-sm">
                <span className="flex sm:justify-center items-center gap-2 ">
                  Criar Conta
                </span>
              </Button>

              <Button
                onClick={loginAccount}
                type="button"
                className="bg-secondary  rounded-sm">
                <span className="flex sm:justify-center items-center gap-2 ">
                  Fazer Login
                </span>
              </Button>

            </div>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}
