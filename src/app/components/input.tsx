'use client'
import { ArrowUp, Search, Verified } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';

const Input = () => {
  // const containerRef = useRef<HTMLDivElement>(null);
  // const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("")


  // useEffect(() => {
  //   if (containerRef.current && textareaRef.current) {
  //     containerRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  //   }
  // }, [text]);

  function sendText() {


  }

  return (
    <div className=" w-full  flex justify-center items-center h-full">
      <div
        // ref={containerRef}
        style={{ border: '2px solid #29292D' }}
        className=" flex flex-row justify-center items-center gap-2 py-1 px-2
       w-full bg-bg-secondcolor text-gray-100 rounded-3xl">


        <Search />


        {/* <TextField
          placeholder="Digite Sua Mensagem"
          value={text}
          onChange={e => setText(e.target.value)}
          variant="outlined"
          fullWidth
        /> */}

      </div>
    </div >
  )
}

export default Input
