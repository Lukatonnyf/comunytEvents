"use client"
import { useRouter } from "next/navigation";
import axios from 'axios'
import { FormWrapper } from "@/providers/ui/formWrapper";
import Button from "@/ui/button";
import { ArrowLeft } from 'lucide-react';

type FormValues = {
  password: string;
  email: string;
};

export default function Login() {
  //   return <Form />
  // }

  const handleSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('/api/login', data); // API route que você vai criar
      const { success, message } = response.data;

      if (success) {
        alert("Login realizado com sucesso!");
        // redirecionar ou armazenar token etc.
      } else {
        alert("Credenciais inválidas: " + message);
      }

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert("Erro no login. Tente novamente.");
    }
  };

  const createAccount = () => {
    window.location.href = '/register'
  }

  const router = useRouter();

  // const returnHomePage = () => {
  //   window.location.href = '/'
  // }

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
        defaultValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
      w-6/7 lg:w-[35rem] p-5 gap-5 bg-secondary rounded-xl"
      >
        {({ register }) => (
          <div className="w-full flex flex-col gap-5">
            <section>
              <h1>Login</h1>
            </section>

            <label className="w-full flex flex-col gap-2">
              Email Cadastrado
              <input
                {...register("email")}
                placeholder="Digite o email da sua conta"
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>

            <label className="w-full flex flex-col gap-2">
              Senha
              <input
                type="password"
                {...register("password")}
                placeholder="Digite a senha da sua conta"
                className="bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
              <p className="text-blue-500 cursor-pointer">esqueci minha senha...</p>
            </label>

            <div className="flex flex-row-reverse mt-10 gap-x-5">

              <Button
                type="submit"
                className="bg-gradient-45 text-white rounded-sm">
                <span className="flex sm:justify-center items-center gap-2 ">
                  Logar
                </span>
              </Button>

              <Button
                onClick={createAccount}
                type="button"
                className="bg-secondary  rounded-sm">
                <span className="flex sm:justify-center items-center gap-2 ">
                  Criar Conta
                </span>
              </Button>

            </div>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}
