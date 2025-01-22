'use client'
import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useVideoComment } from '@/hooks/useVideo'
import { Send, X } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  videoId: string
  commentId?: string
  author: string
  close?: () => void
}

const CommentForm = ({ author, videoId, close, commentId }: Props) => {
  const { errors, isPending, onFormSubmit, register,isAuthenticated } = useVideoComment(
    videoId,
    commentId
  )

  const router = useRouter()

  if (!isAuthenticated) {
    return (
      <div className='flex gap-4 w-full flex-col md:flex-row items-start md:items-center'>
        <div className='text-muted-foreground'>
        Need to login for comment
      </div>
        <Button
          onClick={() => router.replace("/auth/sign-in")}
          variant={"secondary"}
        >
          Sign in
        </Button>
      </div>
      
    )
  }

  return (
    <form
      className="relative w-full"
      onSubmit={onFormSubmit}
    >
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent "
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  )
}

export default CommentForm