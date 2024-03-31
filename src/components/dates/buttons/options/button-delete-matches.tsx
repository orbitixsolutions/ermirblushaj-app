'use client'

import { Button } from '@nextui-org/react'
import useDeleteMatches from '@/hooks/dates-hooks/buttons/options/use-delete-matches'

const ButtonDeleteMatches = () => {
  const { isPending, handleDeleteMatches } = useDeleteMatches()

  return (
    <Button
      isLoading={isPending}
      color='danger'
      onPress={() => handleDeleteMatches()}
    >
      Delete Matchups
    </Button>
  )
}

export default ButtonDeleteMatches
