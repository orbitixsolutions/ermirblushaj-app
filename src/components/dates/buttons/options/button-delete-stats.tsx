'use client'

import { resetAllStats } from '@/actions/services/delete'
import { Button } from '@nextui-org/react'

const ButtonDeleteStats = () => {
  const handleResetStats = async () => {
    await resetAllStats()
  }

  return (
    <Button
      onPress={() => handleResetStats()}
      fullWidth
      color='danger'
      className='text-2xl font-semibold'
    >
      Reset
    </Button>
  )
}

export default ButtonDeleteStats
