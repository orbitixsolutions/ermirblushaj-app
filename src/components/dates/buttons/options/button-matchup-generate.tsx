'use client'

import { Button } from '@nextui-org/react'
import { Group, Team } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import useSWR from 'swr'

type ExtenedGroup = Group & {
  teams: Team[]
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ButtonMatchupGenerate = () => {
  const revalidate = { revalidateOnFocus: true }
  const [isPending, setIsPending] = useState(false)

  const { data: getGroups } = useSWR<ExtenedGroup[]>(
    '/api/groups',
    fetcher,
    revalidate
  )

  const { data: getMatches } = useSWR<ExtenedGroup[]>(
    '/api/matches',
    fetcher,
    revalidate
  )

  const generateMatchups = (group: ExtenedGroup) => {
    setIsPending(true)
    const newGroups = group.teams

    let matchups = []
    for (let i = 0; i < newGroups.length; i++) {
      for (let j = i + 1; j < newGroups.length; j++) {
        matchups.push([newGroups[i], newGroups[j]])
      }
    }

    return matchups
  }

  const createTournamentSchedule = async () => {
    const allMatchups = getGroups?.map((group) => generateMatchups(group))
    const tournamentMatchups = allMatchups?.flat()

    if (getGroups && getGroups.length === 0) {
      setIsPending(false)
      return toast.info('There are not groups created!')
    }

    if (getMatches && getMatches.length === 40) {
      setIsPending(false)
      return toast.info('There are matches created!')
    }

    const matchupPromises = tournamentMatchups?.map((match) =>
      axios.post('/api/matches', {
        teamAId: match[0].id,
        teamBId: match[1].id
      })
    )

    try {
      const responses = await Promise.all(matchupPromises as any)

      if (responses && responses[0].status === 200) {
        setIsPending(false)
        return toast.success('All groups has been created!')
      }
    } catch (error) {
      setIsPending(false)
      return toast.error('An ocurred a error')
    }
  }

  return (
    <Button isLoading={isPending} onPress={() => createTournamentSchedule()}>
      Create Matchups
    </Button>
  )
}

export default ButtonMatchupGenerate
