'use client'

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

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField readOnly defaultValue={inviteLink} />

      {/* <IconButton className="-mr-2" onClick={copyInviteLink}> */}
      <Copy className="size-5" onClick={copyInviteLink} />
      {/* </IconButton> */}
    </InputRoot>
  )
}
