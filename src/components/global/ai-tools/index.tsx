import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import { Bot, FileTextIcon, Pencil, StarsIcon } from 'lucide-react'
import React from 'react'
import Loader from '../loader'

type Props = {
    videoId: string
    trial: boolean
    plan: "PRO" | "FREE"
}

const AiTools = ({videoId, trial, plan}: Props) => {
  return (
    <TabsContent value="Ai tools">
    <div className="p-4 sm:p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold">AI Tools</h2>
          <p className="text-[#BDBDBD] text-sm sm:text-base">
            Taking your video to the next step with the power of AI!
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 w-full justify-start sm:justify-end mt-2 sm:mt-0">
          <Button className="text-xs sm:text-sm">
            <Loader state={false} color="#000">
              Try now
            </Loader>
          </Button>
          <Button className="text-xs sm:text-sm" variant={'secondary'}>
            <Loader state={false} color="#000">
              Pay Now
            </Loader>
          </Button>
        </div>
      </div>
      <div className="border-[1px] rounded-xl p-3 sm:p-4 gap-3 sm:gap-4 flex flex-col bg-[#1b0f1b7f]">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#a22fe0]">Opal AI</h2>
          <StarsIcon color="#a22fe0" fill="#a22fe0" />
        </div>
        <div className="flex gap-2 items-start">
          <div className="p-1.5 sm:p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
            <Pencil color="#a22fe0" size={16} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-medium">Summary</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Generate a description for your video using AI.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="p-1.5 sm:p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
            <FileTextIcon color="#a22fe0" size={16} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-medium">Transcript</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Generate a transcript for your video using AI.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="p-1.5 sm:p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
            <Bot color="#a22fe0" size={16} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-medium">AI Agent</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Viewers can ask questions on your video and our AI agent will respond.
            </p>
          </div>
        </div>
      </div>
    </div>
  </TabsContent>
  )
}

export default AiTools

