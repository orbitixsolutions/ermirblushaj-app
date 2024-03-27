'use client'

import { Button, Divider, Image } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import CardMatchup from '@/components/dates/cards/card-matchup'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const DatePage = () => {
  const [isPending, setIsPending] = useState(false)

  const [groups, setGroups] = useState([])

  const { data: getTeams } = useSWR<Team[]>('/api/teams', fetcher, {
    refreshInterval: 3000
  })

  const { data: getMatches } = useSWR<Match[]>('/api/matches', fetcher, {
    refreshInterval: 3000
  })

  const mixArray = (array: any) => {
    for (let i = array && array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const createGroupTeams = () => {
    let teams = Array.from({ length: 20 }, (_, i) => i + 1)
    teams = mixArray(getTeams)

    let groups = []
    for (let i = 0; i < 4; i++) {
      groups.push(teams && teams.slice(i * 5, (i + 1) * 5))
    }

    return setGroups(groups as any)
  }

  const generateMatchups = (group: any[]) => {
    let matchups = []
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        matchups.push([group[i], group[j]])
      }
    }

    return matchups
  }

  const createTournamentSchedule = async (groups: any[]) => {
    const allMatchups = groups.map((group) => generateMatchups(group))
    const tournamentMatchups = allMatchups.flat()

    const matchupPromises = tournamentMatchups.map((match) => {
      return axios.post('/api/matches', {
        teamAId: match[0].id,
        teamBId: match[1].id
      })
    })

    try {
      setIsPending(true)
      const responses = await Promise.all(matchupPromises)

      if (getMatches && getMatches.length === 40) {
        return toast.error('There are matches created!')
      }

      if (responses && responses[0].status === 200) {
        setIsPending(false)
        return toast.success('All matches has been created!')
      }
    } catch (error) {
      setIsPending(false)
      return toast.error('An ocurred a error')
    }
  }

  const handleDeleteMatches = async () => {
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

  const clearState = () => {
    setGroups([])
  }

  return (
    <section className='w-full container mx-auto py-20'>
      <div className='flex gap-4'>
        <Button color='danger' onPress={() => clearState()}>
          Clear state
        </Button>
        <Button onPress={() => createGroupTeams()}>Random groups</Button>
        <Button
          isLoading={isPending}
          onPress={() => createTournamentSchedule(groups)}
        >
          Create Matchups
        </Button>
        <Button
          isLoading={isPending}
          color='danger'
          onPress={() => handleDeleteMatches()}
        >
          Delete Matchups
        </Button>
      </div>

      <ol className='grid grid-cols-2 gap-4 my-8'>
        {groups.map((item: Team[], index) => (
          <li
            className='grid grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-custom-darkblue rounded-lg'
            key={index}
          >
            {item.map((team) => (
              <div key={team.id}>
                <div className='bg-custom-navy p-4 rounded-lg aspect-square'>
                  <Image
                    src={team.logo || ''}
                    className='size-full object-cover'
                    alt={`Image team ${team.name}`}
                  />
                </div>
                <h3 className='line-clamp-1 text-lg font-bold text-center mt-4'>
                  {team.name}
                </h3>
              </div>
            ))}
          </li>
        ))}
      </ol>
      <Divider className='my-20 bg-custom-gray' orientation='horizontal' />
      <ol className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {getMatches &&
          getMatches.map((item: any) => (
            <CardMatchup key={item.id} item={item} />
          ))}
      </ol>
    </section>
  )
}

export default DatePage
