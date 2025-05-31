
import { FormWrapper } from "@/providers/ui/formWrapper";
import Button from "./button";


type FormValues = {
  nome: string;
  email: string;
};

type FormularioProps = {
  showForm: () => void;
};


const Form = ({ showForm }: FormularioProps) => {
  const handleSubmit = (data: FormValues) => {
    console.log("Dados:", data);
  };

  return (

    <FormWrapper
      defaultValues={{ nome: "", email: "" }}
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center
      fixed  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50
      w-6/7  lg:w-[35rem] p-5 gap-5 bg-secondary rounded-xl
      "
    >
      {({ register }) => (
        <>
          <div className="w-full  flex flex-row gap-5">
            <label className="w-full flex flex-col gap-2">Nome da Atividade
              <input
                {...register("nome")}
                placeholder=""
                className=" bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>
          </div>

          {/* Box Inputs Data Horário  */}
          <div className="w-full flex flex-row gap-5">
            <label className="w-full flex flex-col gap-2">Data
              <input
                {...register("nome")}
                placeholder=""
                className=" bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>

            <label className="w-[20dvw] flex flex-col gap-2">Horário
              <input
                {...register("email")}
                placeholder=""
                type="email"
                className=" bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>
          </div>

          {/* Box Input Local */}
          <div className="w-full  flex flex-row gap-5">
            <label className="w-full flex flex-col gap-2">Local
              <input
                {...register("nome")}
                placeholder=""
                className=" bg-tertiary border-1 p-2 rounded-sm outline-none"
              />
            </label>
          </div>

          {/* Box TextField Descrição */}
          <div className="w-full  flex flex-row gap-5">
            <label className="w-full flex flex-col gap-2">Descrição
              <textarea
                {...register("nome")}
                placeholder=""
                className=" min-h-[10dvh] bg-tertiary border-1 p-2 rounded-sm outline-none resize-none"
              />
            </label>
          </div>

          {/* Box TextField Convidar pessoas */}
          <div className="w-full flex flex-col gap-2">
            <h1>Descrição</h1>
            <label className="flex flex-col bg-tertiary border-1
            pt-2 px-2 rounded-sm ">
              <span className="bg-secondary p-2 rounded-2xl">
                Pessoas convidadas</span>
              <input
                {...register("nome")}
                placeholder="Digite um nome"
                className=" bg-tertiary  p-2 pb-3 rounded-sm outline-none"
              />
            </label>
          </div>

          <div className="w-full flex flex-col gap-2">
            <h1>Notificações</h1>

            <section className=" flex flex-row gap-3">
              <label className="flex flex-row gap-2">
                <input type="checkbox" />
                <span>Email</span>
              </label>

              <label className="flex flex-row gap-2">
                <input type="checkbox" />
                <span>SMS</span>
              </label>

              <label className="flex flex-row gap-2">
                <input type="checkbox" />
                <span>No aplicativo</span>
              </label>
            </section>


            <div className="flex flex-row-reverse mt-10 gap-x-5">
              <Button className="bg-gradient-45 text-white rounded-sm ">
                <span className="flex sm:justify-center  items-center gap-2 ">
                  Criar Evento
                </span>
              </Button>
              <Button className="bg-secondary rounded-sm"
                onClick={showForm}>
                <span className="flex sm:justify-center items-center gap-2  font-normal ">
                  Cancelar
                </span>
              </Button>
            </div>
          </div>

        </>
      )}
    </FormWrapper>
  )

}

export default Form
