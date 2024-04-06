'use client'

import useDeleteGroups from '@/hooks/dates-hooks/buttons/options/use-delete-groups'
import { Button } from '@nextui-org/react'

const ButtonDeleteGroups = () => {
  const { isPending, handleDeleteGroups } = useDeleteGroups()

  return (
    <Button
      onPress={() => handleDeleteGroups()}
      isLoading={isPending}
      color='danger'
      fullWidth
      className='text-2xl font-semibold'
    >
      Delete
    </Button>
  )
}

export default ButtonDeleteGroups
