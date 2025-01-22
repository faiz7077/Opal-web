'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TabMenuProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  triggers: string[]
  defaultValue: string
}

const TabMenu = React.forwardRef<
  React.ElementRef<typeof Tabs>,
  TabMenuProps
>(({ className, triggers, defaultValue, children, ...props }, ref) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className={className}
      {...props}
      ref={ref}
    >
      <TabsList className="w-full flex  justify-start bg-[#1D1D1D] p-1">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="flex-grow text-xs sm:text-sm md:text-base py-2 px-3 data-[state=active]:bg-[#252525] data-[state=active]:text-white rounded-md transition-all duration-200 ease-in-out"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
})
TabMenu.displayName = 'TabMenu'

export default TabMenu

