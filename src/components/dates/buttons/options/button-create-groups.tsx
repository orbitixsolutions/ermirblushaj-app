'use client'

import { Button } from '@nextui-org/react'
import useCreateGroups from '@/hooks/dates-hooks/buttons/options/use-create-groups'

const ButtonCreateGroups = () => {
  const { isPending, handleCreateGroups } = useCreateGroups()

  return (
    <Button
      onPress={() => handleCreateGroups()}
      isLoading={isPending}
      fullWidth
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Sort
    </Button>
  )
}

export default ButtonCreateGroups
