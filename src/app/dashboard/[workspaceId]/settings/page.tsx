"use client"
import { enableFirstView, getFirstView } from '@/actions/user'
import { DarkMode } from '@/components/theme-placeholders/darkmode'
import { LightMode } from '@/components/theme-placeholders/lightmode'
import { SystemMode } from '@/components/theme-placeholders/systemmode'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {}

const SettingsPage = (props: Props) => {
  const [firstView, setFirstView] = useState<undefined | boolean>(undefined)
  const {setTheme,theme} = useTheme()

  useEffect(() => {
    if(firstView !== undefined) return
    const fetchData = async () => {
      const response = await getFirstView()
      if(response.status === 200) setFirstView(response.data)
    }
    fetchData()
  },[firstView])

  const switchState = async (checked: boolean) => {
    const view = await enableFirstView(checked)
    if(view) {
      toast(view.status === 200 ? "Success" : "Failed", {
        description: view.data,
      })
    }
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'system' && 'border-purple-800'
            )}
            onClick={() => setTheme('system')}
          >
            <SystemMode />
          </div>
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'light' && 'border-purple-800'
            )}
            onClick={() => setTheme('light')}
          >
            <LightMode />
          </div>
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'dark' && 'border-purple-800'
            )}
            onClick={() => setTheme('dark')}
          >
            <DarkMode />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
      <p className="text-muted-foreground">
        Enabling this feature will send you notifications when someone watched
        your video for the first time. This feature can help during client
        outreach.
      </p>
      <Label className="flex items-center gap-x-3 mt-4 text-md">
        Enable First View
        <Switch
          onCheckedChange={switchState}
          disabled={firstView === undefined}
          checked={firstView}
          onClick={() => setFirstView(!firstView)}
        />
      </Label>
    </div>
  )
}

export default SettingsPage