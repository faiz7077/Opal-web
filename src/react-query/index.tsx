"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'


type Props = {
    children: React.ReactNode
}

const ReactQueryProvider = ({children}: Props) => {
  const query = new QueryClient()
  return (
    <QueryClientProvider client={query}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider