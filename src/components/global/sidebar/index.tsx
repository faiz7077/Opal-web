'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Menu, PlusCircle } from 'lucide-react'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkSpaces } from '@/actions/workspace'
import { getNotifications } from '@/actions/user'
import { WORKSPACES } from '@/redux/slices/workspace'
import { MENU_ITEMS } from '@/constants'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import Modal from '../modal'
import Search from '../search'
import SidebarItem from './sidebar-item'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import InfoBar from '../info-bar'
import PaymentButton from '../payment-button'

import { NotificationProps, WorkspaceProps } from '@/types/index.type'

type Props = {
  activeWorkspaceId: string
}

export default function Sidebar({ activeWorkspaceId }: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const dispatch = useDispatch()

  const { data: workspaceData, isFetched } = useQueryData(['user-workspaces'], getWorkSpaces)
  const { data: notificationsData } = useQueryData(['user-notifications'], getNotifications)

  const menuItems = MENU_ITEMS(activeWorkspaceId)

  const { data: workspace } = workspaceData as WorkspaceProps
  const { data: notificationCount } = notificationsData as NotificationProps

  const currentWorkspace = workspace?.workspace.find((s) => s.id === activeWorkspaceId)

  React.useEffect(() => {
    if (isFetched && workspace) {
      dispatch(WORKSPACES({ workspaces: workspace.workspace }))
    }
  }, [isFetched, workspace, dispatch])

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`)
  }

  const SidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex items-center justify-center p-6 border-b border-gray-800">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" className="mr-2" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Opal
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
          <SelectTrigger className="w-full mb-4 bg-gray-800 border-gray-700 text-gray-200">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectGroup>
              <SelectLabel className="text-gray-400">Workspaces</SelectLabel>
              <Separator className="bg-gray-700" />
              {workspace?.workspace.map((ws) => (
                <SelectItem key={ws.id} value={ws.id} className="text-gray-200">
                  {ws.name}
                </SelectItem>
              ))}
              {workspace?.members.map((member) => 
                member.WorkSpace && (
                  <SelectItem key={member.WorkSpace.id} value={member.WorkSpace.id} className="text-gray-200">
                    {member.WorkSpace.name}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {currentWorkspace?.type === 'PUBLIC' && workspace?.subscription?.plan === 'PRO' && (
          <Modal
            trigger={
              <Button variant="outline" className="w-full mb-4 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Invite To Workspace
              </Button>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}

        <nav className="space-y-1 mb-6 list-none">
          <h2 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h2>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              // notifications={item.title === 'Notifications' ? notificationCount?._count?.notification || 0 : 0}
            />
          ))}
        </nav>

        <Separator className="my-4 bg-gray-700" />

        <div className="space-y-4">
          <h2 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Workspaces</h2>
          {workspace?.workspace.length === 1 && workspace.members.length === 0 ? (
            <p className="text-sm text-gray-500 px-3">
              {workspace.subscription?.plan === 'FREE'
                ? 'Upgrade to create workspaces'
                : 'No Workspaces'}
            </p>
          ) : (
            <nav className="space-y-1 list-none">
              {workspace?.workspace.map((item) =>
                item.type !== 'PERSONAL' && (
                  <SidebarItem
                    key={item.id}
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    // notifications={0}
                    icon={<WorkspacePlaceholder>{item.name.charAt(0)}</WorkspacePlaceholder>}
                  />
                )
              )}
              {workspace?.members.map((item) =>
                item.WorkSpace && (
                  <SidebarItem
                    key={item.WorkSpace.id}
                    href={`/dashboard/${item.WorkSpace.id}`}
                    selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                    title={item.WorkSpace.name}
                    // notifications={0}
                    icon={<WorkspacePlaceholder>{item.WorkSpace.name.charAt(0)}</WorkspacePlaceholder>}
                  />
                )
              )}
            </nav>
          )}
        </div>
      </div>

      {workspace?.subscription?.plan === 'FREE' && (
        <div className="p-4 bg-gray-800 rounded-lg mx-3 mb-4">
          <GlobalCard
            title="Upgrade to Pro"
            description="Unlock AI features like transcription, AI summary, and more."
            footer={<PaymentButton />}
          />
        </div>
      )}
    </div>
  )

  return (
    <>
      <InfoBar />
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="fixed top-4 left-4 z-40">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block w-64  h-screen overflow-y-auto ">
        {SidebarContent}
      </div>
    </>
  )
}