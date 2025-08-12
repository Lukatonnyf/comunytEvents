interface skeletonProps {
  className?: string
}

export default function SkeletonCard({ className = '' }: skeletonProps) {
  return (
    <div className={` flex flex-col justify-between gap-2 md:max-w-[25vw] w-full min-h-[35dvh] p-5 rounded-xl ${className}`}>
      <div className='flex flex-row flex-wrap gap-5'>
        <div className='min-w-[17rem] w-full md:w-[100rem] lg:max-w-[19rem] h-[23rem] bg-secondary rounded p-0 flex flex-col justify-between pb-4 animate-pulse'>

          {/* Topo: Dia e Mês */}
          <div className='flex flex-col rounded-t-xl justify-center items-center bg-tertiary h-[15dvh] gap-2'>
            <div className='h-6 w-12  bg-secondary   rounded' />
            <div className='h-4 w-20 bg-secondary  rounded' />
          </div>

          {/* Meio: Nome, info, ações */}
          <section className='flex flex-col h-full gap-3'>
            <main className='flex flex-col justify-between p-3 h-full gap-3'>
              <div className='h-5 w-3/4  bg-tertiary blur-xs  rounded' />

              <ul className='space-y-2'>
                <li className='flex items-center gap-2'>
                  <div className='h-4 w-4  bg-tertiary blur-xs  rounded-full' />
                  <div className='h-3 w-1/2  bg-tertiary blur-xs  rounded' />
                </li>
                <li className='flex items-center gap-2'>
                  <div className='h-4 w-4  bg-tertiary blur-xs  rounded-full' />
                  <div className='h-3 w-2/3  bg-tertiary blur-xs  rounded' />
                </li>
                <li className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4  bg-tertiary blur-xs  rounded-full' />
                    <div className='h-3 w-1/3  bg-tertiary blur-xs  rounded' />
                  </div>
                  <div className='h-3 w-1/2 ml-5  bg-tertiary blur-xs  rounded' />
                </li>
              </ul>

              {/* Botões de ação */}
              <div className='flex flex-row gap-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='size-8 rounded-full bg-tertiary' />
                ))}
              </div>
            </main>

            {/* Rodapé */}
            <footer className='flex justify-between border-t p-3'>
              <div className='h-3 w-24  bg-tertiary blur-xs  rounded' />
              <div className='h-3 w-16  bg-tertiary blur-xs  rounded' />
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
