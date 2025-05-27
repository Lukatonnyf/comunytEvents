interface CardProps {
  children?: React.ReactNode;
  className?: string;
}
const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`${className}
  bg-secondary w-full  flex flex-col
  pt-6 pb-5 px-5 rounded-xl shadow-lg dark:shadow-md`} >
      {children}
    </div>
  )
}

export default Card;
