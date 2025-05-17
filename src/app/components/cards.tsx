interface CardProps {
  title: string;
  description: string;
  buttons?: {
    className: string | undefined;
    text: React.ReactNode | string;
    onClick?: () => void;
  }[];
  className?: string;

}



const Cards = ({ title, description, buttons = [], className = '' }: CardProps) => {
  return (
    <div className="w-full  flex flex-col justify-center items-center ">
      <div className={`${className} bg-bg-secondary w-full min-h-[35dvh]  h-full  flex flex-col
         py-5 px-4  rounded-2xl gap-5 sm:min-h-full sm:gap-2`}>
        <div className="flex flex-col gap-3 sm:gap-2">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className="text-gray-400 text-1xl">{description}</p>
        </div>

        <div className="flex flex-col flex-wrap gap-4 mt-4 sm:flex-row ">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`${[btn.className]}  text-start text-sm font-medium   text-white rounded-3xl
              py-3 px-7  sm:py-3 sm:px-4
              sm:flex sm:justify-center sm:items-center sm:text-xs`}>
              {btn.text}
            </button>
          ))}
        </div>
      </div>

    </div >
  );
};



// Card DOS EVENTOS
const CardEvents = () => {
  return (
    <div className="w-full  flex flex-col justify-center items-center ">
      <div className="bg-bg-secondary w-full min-h-[35dvh]  h-full  flex flex-col
         py-5 px-4  rounded-2xl gap-5 sm:min-h-full sm:gap-2">
      </div>
    </div>
  )
}

export default Cards;
export { CardEvents };
