import { Button } from '@/components/ui/button'
import { Menu, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center max-md:gap-x-5">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-[4rem]" />
        <Image 
        alt="logo"
        src="./opal-logo.svg" 
        width={40}
        height={40}
        />
        Opal
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link href="/"
        className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >Home</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#features">Features</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button className="text-base flex gap-x-2">
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </div>
  )
}

export default LandingPageNavBar