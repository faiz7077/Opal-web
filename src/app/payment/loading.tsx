import { Spinner } from '@/components/global/loader/spinner'
import React from 'react'


const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
        <Spinner />
    </div>
  )
}

export default Loading