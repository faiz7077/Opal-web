import { createFolder } from '@/actions/workspace'
import { useMutationData } from './useMutationData'

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ['create-folder'],
    () => createFolder(workspaceId),
    'workspace-folders'
  )

  const onCreateNewFolder = () =>
    mutate({ name: 'Untitled', id: 'optimitsitc--id' })
  return { onCreateNewFolder }
}