'use client'

import useDeleteGroups from '@/hooks/dates-hooks/buttons/options/use-delete-groups'
import { Button } from '@nextui-org/react'

const ButtonDeleteGroups = () => {
  const { isPending, handleDeleteGroups } = useDeleteGroups()

  return (
    <Button
      isLoading={isPending}
      color='danger'
      onPress={() => handleDeleteGroups()}
    >
      Delete Groups
    </Button>
  )
}

export default ButtonDeleteGroups
