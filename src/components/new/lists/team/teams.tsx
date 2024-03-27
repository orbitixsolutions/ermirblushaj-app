'use client'

import { Team } from '@prisma/client'
import axios from 'axios'
import useSWR from 'swr'
import WrapperNew from '@/components/new/wrappers/wrapper-new'
import CardTeamImage from '@/components/new/cards/teams/card-team-image'
import NoItems from '@/components/new/lists/no-items'
import SkeletonNew from '@/components/new/skeleton/skeleton-new'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Teams = () => {
  const { data: teams } = useSWR<Team[]>('/api/teams', fetcher, {
    refreshInterval: 3000
  })

  const DEFAULT_ITEMS = 0
  const UNDEFINED_TEAMS = undefined
  const isLoaded = teams?.length === 0

  if (teams && teams.length === DEFAULT_ITEMS) {
    return <NoItems />
  }

  if (teams === UNDEFINED_TEAMS) {
    return <SkeletonNew isLoaded={isLoaded} />
  }

  return (
    <WrapperNew>
      {teams &&
        teams.map((team) => <CardTeamImage key={team.id} team={team} />)}
    </WrapperNew>
  )
}

export default Teams
