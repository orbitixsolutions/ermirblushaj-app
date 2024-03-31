'use client'

import { Button } from '@nextui-org/react'
import useCreateGroups from '@/hooks/dates-hooks/buttons/options/use-create-groups'

const ButtonCreateGroups = () => {
  const { isPending, handleCreateGroups } = useCreateGroups()

  return (
    <Button isLoading={isPending} onPress={() => handleCreateGroups()}>
      Create Groups
    </Button>
  )
}

export default ButtonCreateGroups
