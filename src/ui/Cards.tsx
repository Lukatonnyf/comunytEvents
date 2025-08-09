interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`${className}
  bg-secondary  flex flex-col
 rounded-xl shadow-lg dark:shadow-md`} >
      {children}
    </div>
  )
}

export default Card;
