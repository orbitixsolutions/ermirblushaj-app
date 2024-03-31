'use client'

import { Button } from '@nextui-org/react'
import useCreateMatches from '@/hooks/dates-hooks/buttons/options/use-create-matches'

const ButtonCreateMatches = () => {
  const { isPending, handleCreateMatches } = useCreateMatches()

  return (
    <Button isLoading={isPending} onPress={() => handleCreateMatches()}>
      Create Matchups
    </Button>
  )
}

export default ButtonCreateMatches
