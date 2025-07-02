"use client"

import { Input } from "@/shadcn-uis/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "../../../../shadcn-uis/ui/card";
import { FormWrapper } from "@/providers/ui/formWrapper";
import axios from "axios";
import Button from "@/ui/button";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email?: string;
  location: string;
  hour: Date;
}

export default function FormPageClient() {
  const router = useRouter()

  const handleSubmit = async (data: FormValues) => {
    console.log("dados q serão enviados para a API: ", data)
    data.hour = new Date(data.hour);
    alert("cadastrado com sucesso!")
    router.push('/')
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('/api/createEvent', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("resposta da API: ", response.data)


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('erro Axios', error.response?.data || error.message)
      } else {
        console.error('erro ao enviar dados:', error)
      }
    }
  }


  return (
    <FormWrapper
      defaultValues={{
        name: "", email: "", location: "", hour: new Date(),
      }}
      onSubmit={handleSubmit}
      className="w-full lg:w-full h-full flex flex-col gap-5 rounded-xl py-6 shadow-sm text-[#a9a9a9] bg-white/3 backdrop-blur-lg border border-bordercomponents"
    >
      {(methods) => (
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Crie Seu Próprio evento</CardTitle>
            <CardDescription>Descreva as Informações do seu evento abaixo:</CardDescription>
          </CardHeader>
          <CardContent>
            <section>
              <div className="flex flex-col gap-6">
                {/** Inputs */}
                {[
                  { id: "name", type: "text", label: "Nome", placeholder: "Digite seu Nome" },
                  { id: "email", type: "email", label: "Email", placeholder: "Digite seu Email" },
                  { id: "location", type: "text", label: "Endereço", placeholder: "Digite o Endereço do seu evento" },
                ].map(({ id, type, label, placeholder }) => (
                  <div className="grid gap-2" key={id}>
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      className="border border-bordercomponents outline-none"
                      required
                      {...methods.register(id as keyof FormValues)}
                    />
                  </div>
                ))}

                <div className="grid gap-2">
                  <Label htmlFor="date">Data do Evento</Label>
                  <Input
                    id="date"
                    type="date"
                    className="border border-bordercomponents outline-none"
                    required
                    {...methods.register("hour")}
                  />
                </div>
              </div>
            </section>
          </CardContent>

          <CardFooter>
            <Button
              // onClick={goToHome
              type="submit" className="w-full">
              Criar Evento
            </Button>
          </CardFooter>
        </Card>
      )}
    </FormWrapper>
  )
}
