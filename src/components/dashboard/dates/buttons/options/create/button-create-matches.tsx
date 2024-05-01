'use client'

import { Button } from '@nextui-org/react'
import useCreateMatches from '@/hooks/dates-hooks/buttons/options/use-create-matches'

const ButtonCreateMatches = () => {
  const { isPending, handleCreateMatches } = useCreateMatches()

  return (
    <Button
      onPress={() => handleCreateMatches()}
      isLoading={isPending}
      fullWidth
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Generate
    </Button>
  )
}

export default ButtonCreateMatches
