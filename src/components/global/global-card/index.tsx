import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
    title: string
    description: string
    children?: React.ReactNode
    footer?: React.ReactNode
}

const GlobalCard = ({title,description,children,footer}: Props) => {
  return (
    <Card className="bg-transparent mt-2">
        <CardHeader className="p-4">
            <CardTitle className="text-muted text-[#9D9D9D]">
                {title}
            </CardTitle>
            <CardDescription className="text-[#707070]">
                {description}
            </CardDescription>
        </CardHeader>
        {children && <div className="p-4">{children}</div>}
        {footer && <CardFooter className="p-4">{footer}</CardFooter>}
    </Card>
  )
}

export default GlobalCard