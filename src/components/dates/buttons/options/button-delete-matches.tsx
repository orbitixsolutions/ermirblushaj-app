'use client'

import { Button } from '@nextui-org/react'
import useDeleteMatches from '@/hooks/dates-hooks/buttons/options/use-delete-matches'

const ButtonDeleteMatches = () => {
  const { isPending, handleDeleteMatches } = useDeleteMatches()

  return (
    <Button
    onPress={() => handleDeleteMatches()}
      isLoading={isPending}
      color='danger'
      fullWidth
      className='text-2xl font-semibold'
    >
      Delete
    </Button>
  )
}

export default ButtonDeleteMatches
