  import VideoRecorderIcon from '@/components/icons/video-recorder'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { UserButton } from '@clerk/nextjs'
  import { Search, UploadIcon } from 'lucide-react'
  import React from 'react'


  const InfoBar = () => {
    return (
      <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
        <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg max-md:border-none ">
          <Search
            size={25}
            className="text-[#707070]"
          />
          <Input
            className="bg-transparent border-none !placeholder-neutral-500 hidden md:block"
            placeholder="Search for people, projects, tags & folders"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#9D9D9D] flex items-center gap-2">
            <UploadIcon size={20} />{' '}
            <span className="flex items-center gap-2 max-md:hidden">Upload</span>
          </Button>
          <Button className="bg-[#9D9D9D] flex items-center gap-2">
            <VideoRecorderIcon />
            <span className="flex items-center gap-2 max-md:hidden">Record</span>
          </Button>
          <UserButton />
        </div>
      </header>
    )
  }

  export default InfoBar