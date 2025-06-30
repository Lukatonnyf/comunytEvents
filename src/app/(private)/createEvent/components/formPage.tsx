"use client"

import { Input } from "@/shadcn-uis/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../shadcn-uis/ui/card";

import { StaticImageData } from "next/image";
import { FormWrapper } from "@/providers/ui/formWrapper";

interface FormValues {
  name: string,
  email?: string,
  location: string,
  hour: Date,
  image?: StaticImageData | null | string,
}


export default function FormPage() {


  const handleSubmit = async (data: FormValues) => {
    console.log("dados q serão enviados para a API: ", data)

    // try {
    //   const response = await axios.post('/api/feedback', data)
    //   console.log("resposta da API: ", response.data, { text: "foifoi" })


    //   if (response.data.ok) {

    //     router.push('https://lukatonnysferreiraportifolio.vercel.app/')
    //   }
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     console.error('erro Axios', error.response?.data || error.message)
    //   } else {
    //     console.error('erro ao enviar dados:', error)
    //   }
    // }

  }

  return (
    <FormWrapper defaultValues={{ name: "", email: "", location: "", hour: new Date(), image: "" }}
      onSubmit={handleSubmit}
      className="w-full max-w-sm h-full flex flex-col
      gap-5 rounded-xl  py-6 shadow-sm
      text-[#a9a9a9]
    bg-white/3  backdrop-blur-lg
       border border-bordercomponents">
      {(methods) => (
        <Card >
          <CardHeader>
            <CardTitle>Crie Seu Própio evento</CardTitle>
            <CardDescription>Descreva as Informações do seu evento abaixo:</CardDescription>
          </CardHeader>

          {/* MAIN */}
          <CardContent>
            <section>
              <div className="flex flex-col gap-6">
                {/* INPUT NAME */}
                <div className="grid gap-2">
                  <Label htmlFor="text">Nome</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Digite seu Nome"
                    className=" border border-bordercomponents outline-none  "
                    required
                    {...methods.register("name")}
                  />
                </div>
              </div>
            </section>
          </CardContent>

          {/* FOOTER */}
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      )}
    </FormWrapper>
  )
}
