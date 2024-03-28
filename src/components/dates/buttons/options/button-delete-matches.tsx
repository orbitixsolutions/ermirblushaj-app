'use client'

import { Button } from '@nextui-org/react'
import { Match } from '@prisma/client'
import { toast } from 'sonner'
import { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ButtonDeleteMatches = () => {
  const [isPending, setIsPending] = useState(false)
  const revalidate = { revalidateOnFocus: true }

  const { data: getMatches } = useSWR<Match[]>(
    '/api/matches',
    fetcher,
    revalidate
  )

  const handleDeleteMatches = async () => {
    if (getMatches && getMatches.length === 0) {
      setIsPending(false)
      return toast.error('There are not matches created!')
    }

    const sendPromises = getMatches?.map((matchup) =>
      axios.delete(`/api/matches/${matchup.id}`)
    )
    try {
      setIsPending(true)
      const responses = await Promise.all(sendPromises as any)

      if (responses[0].status === 200) {
        setIsPending(false)
        return toast.success('All matches has been deleted!')
      }
    } catch (error) {
      setIsPending(false)
      return toast.error('An ocurred a error!')
    }
  }

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
