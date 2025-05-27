// "use client";

// import { useState } from "react";
// // import texts

// interface CardProps {
//   title: string;
//   description: string;
//   buttons?: {
//     className: string | undefined;
//     text: React.ReactNode | string;
//     onClick?: () => void;
//   }[];
//   className?: string;

// }


// /**                           TAREFAS
//  * @Tarefa :
//  * Modificar o Card para receber props do tipo children, para reutilização dele
//  */

// const Cards = ({ title, description, buttons = [], className = '' }: CardProps) => {
//   const [onMouse, setOnmoue] = useState<number | null>(null);

//   return (
//     <div className="flex flex-row">

//       <main className="w-full flex flex-col justify-center items-center ">

//         <div className={`${className} bg-secondary w-full  flex flex-col
//          py-5 px-4 rounded-2xl shadow-lg dark:shadow-sm `}>
//           <div className="flex flex-col mb-[18px]">
//             <h1 className=" text-[1.8rem] font-bold mb-[5px]">{title}</h1>
//             <p className="dark:text-gray-400  text-[1rem]">{description}</p>
//           </div>

//           <div className="flex flex-col flex-wrap gap-4 mt-4 sm:flex-row ">
//             {buttons.map((btn, i) => (
//               <button
//                 key={i}
//                 onClick={btn.onClick}
//                 className={`${[btn.className]}  text-start text-sm font-medium  rounded-3xl
//               py-3 px-7 bg-tertyary
//               sm:py-3 sm:px-5  sm:flex sm:justify-center sm:items-center sm:text-sm
//               transition-all duration-300 hover:-translate-y-[2px]
//               ${onMouse === i ? 'shadow-lg' : ''}`}
//                 onMouseEnter={() => setOnmoue(i)}
//                 onMouseLeave={() => setOnmoue(null)}>
//                 {btn.text}
//               </button>
//             ))}
//           </div>
//         </div>

//       </main >
//     </div >
//   );
// };



// // Card DOS EVENTOS
// // const CardEvents = () => {
// //   return (
// //     <div className="w-full  flex flex-col justify-center  py-5 ">
// //       <div className=" w-full  flex
// //          rounded-2xl gap-5 sm:min-h-full sm:gap-2">

// //         <Cards title="Bem-vindo(a) de volta, User"
// //           description="Dia da semana, Dia(Num) mês e ano atual"
// //           className="  max-w-[17dvw] h-[35dvh] border-l-3 border-l-sidebar-accent" />
// //         <Cards title="Bem-vindo(a) de volta, User"
// //           description="Dia da semana, Dia(Num) mês e ano atual"
// //           className="   max-w-[17dvw] h-[35dvh] " />
// //         <Cards title="Bem-vindo(a) de volta, User"
// //           description="Dia da semana, Dia(Num) mês e ano atual"
// //           className="  max-w-[17dvw] h-[35dvh] " />
// //       </div>
// //     </div>
// //   )
// // }

// // export default Cards;
// // export { CardEvents };
