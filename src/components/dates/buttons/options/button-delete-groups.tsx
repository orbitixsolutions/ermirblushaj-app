'use client'

import { Button } from '@nextui-org/react'
import { Match } from '@prisma/client'
import { toast } from 'sonner'
import { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ButtonDeleteGroups = () => {
  const [isPending, setIsPending] = useState(false)
  const revalidate = { revalidateOnFocus: true }

  const { data: getGroups } = useSWR<Match[]>(
    '/api/groups',
    fetcher,
    revalidate
  )

  const handleDeleteGroups = async () => {
    if (getGroups && getGroups.length === 0) {
      setIsPending(false)
      return toast.error('There are not groups created!')
    }

    const sendPromises = getGroups?.map((group) =>
      axios.delete(`/api/groups/${group.id}`)
    )
    try {
      setIsPending(true)
      const responses = await Promise.all(sendPromises as any)

      if (responses[0].status === 200) {
        setIsPending(false)
        return toast.success('All groups has been deleted!')
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
      onPress={() => handleDeleteGroups()}
    >
      Delete Groups
    </Button>
  )
}

export default ButtonDeleteGroups
