'use client'

import { resetAllStats } from '@/actions/services/delete'
import { Button } from '@nextui-org/react'

const ButtonDeleteStats = () => {
  const handleClick = async () => {
    await resetAllStats()
  }

  return (
    <Button color='danger' onPress={() => handleClick()}>
      Reset Stats
    </Button>
  )
}

export default ButtonDeleteStats
