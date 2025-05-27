interface CardProps {
  children?: React.ReactNode;
  className?: string;
}
const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`${className}
bg-secondary w-full  flex flex-col
         py-5 px-4 rounded-2xl shadow-lg dark:shadow-sm
  `} >
      {children}
    </div>
  )
}

export default Card;
