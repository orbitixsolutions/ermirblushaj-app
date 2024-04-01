'use client'

import { Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import WrapperNew from '@/components/new/wrappers/wrapper-new'
import CardTeamImage from '@/components/new/cards/teams/card-team-image'
import NoItems from '@/components/new/lists/no-items'
import SkeletonNew from '@/components/new/skeleton/skeleton-new'
import useSWR from 'swr'

const Teams = () => {
  const EMPTY_ITEMS = 0

  const {
    data: teams,
    isLoading,
    error
  } = useSWR<Team[]>('/api/teams', fetcher, {
    refreshInterval: 3000
  })

  if (error) return <p>An ocurred a error</p>

  if (teams?.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonNew isLoaded={isLoading} />
  }

  return (
    <WrapperNew>
      {teams?.map((team) => (
        <CardTeamImage key={team.id} team={team} />
      ))}
    </WrapperNew>
  )
}

export default Teams
