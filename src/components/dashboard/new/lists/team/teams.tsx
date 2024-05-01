'use client'

import { Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import WrapperNew from '@/components/dashboard/new/wrappers/wrapper-new'
import CardTeamImage from '@/components/dashboard/new/cards/teams/card-team-image'
import NoItems from '@/components/dashboard/new/lists/no-items'
import SkeletonNew from '@/components/dashboard/new/skeleton/skeleton-new'
import useSWR from 'swr'

const Teams = () => {
  const EMPTY_ITEMS = 0

  const {
    data: teams,
    isLoading,
    error
  } = useSWR<Team[]>('/api/teams', fetcher)

  if (error) return <h2>Data could not be loaded.</h2>

  if (teams?.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonNew />
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
