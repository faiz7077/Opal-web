import { Links } from '@/components/icons'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  className? : string
  videoId : string
  variant?:
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | null
}

const CopyLink = ({className,videoId,variant}: Props) => {
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    )
    toast("Copied", {
      description: "Link successfully copied",
    })
  }
  return (
    <Button
      variant={variant}
      onClick={onCopyClipboard}
      className={className}
    >
      <Links />
    </Button>
  )
}

export default CopyLink