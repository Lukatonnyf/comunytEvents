'use client'

import QRCode from 'qrcode'
import { useState } from 'react'
import Image from 'next/image'
import { Copy, Link } from 'lucide-react'
// import { IconButton } from './icon-button'
import { InputIcon, InputRoot, InputField } from './input'


interface InviteLinkInputProps {
  inviteLink: string
}

export function InviteLinkInput({ inviteLink }: InviteLinkInputProps) {
  function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink)
  }

  const [qrCode, setQRCode] = useState("")

  const generate = () => {
    QRCode.toDataURL(`${inviteLink}`).then(setQRCode)
  }

  return (
    <InputRoot className='flex-1 flex-col'>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField readOnly defaultValue={inviteLink} />

      {/* <IconButton className="-mr-2" onClick={copyInviteLink}> */}
      <Copy className="size-5" onClick={copyInviteLink} />
      {/* </IconButton> */}

      <Image
        src={qrCode}
        alt='Qr Code '
        width={300}
        height={100}
      />

      <button onClick={generate}>gerar qr code</button>

    </InputRoot >
  )
}
