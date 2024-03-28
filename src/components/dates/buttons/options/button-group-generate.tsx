'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { Group, Team } from '@prisma/client'
import { toast } from 'sonner'
import axios, { AxiosError } from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ButtonGroupGenerate = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getTeams } = useSWR<Team[]>('/api/teams', fetcher, {
    refreshInterval: 3000
  })

  // Mezclamos el array de 20 equipos que llega como paramentro
  const mixArray = (array: Team[]) => {
    for (let i = array && array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    console.log(array)
    return array
  }

  const generateGroups = () => {
    setIsPending(true)
    let teams = Array.from({ length: 20 }, (_, i) => i + 1) as unknown as Team[]
    teams = mixArray(getTeams as Team[])

    let groups = []
    for (let i = 0; i < 4; i++) {
      const grupupName = String.fromCharCode(65 + i)

      let group = {
        groupName: grupupName,
        teams: teams.slice(i * 5, (i + 1) * 5)
      }
      groups.push(group)
    }

    return groups
  }

  const createGroups = async () => {
    const generatedGroups = generateGroups()

    const groupsPromises = generatedGroups.map((groups) =>
      axios.post('/api/groups', groups)
    )

    try {
      const responses = await Promise.all(groupsPromises)

      if (responses && responses[0].status === 200) {
        setIsPending(false)
        return toast.success('Groups has been created!')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status === 409
        if (status) {
          setIsPending(false)
          const errorMessage = error.response?.data.error
          return toast.error(errorMessage)
        }
      }

      return toast.error('An ocurred a error!')
    }
  }

  return (
    <Button isLoading={isPending} onPress={() => createGroups()}>
      Create Groups
    </Button>
  )
}

export default ButtonGroupGenerate
