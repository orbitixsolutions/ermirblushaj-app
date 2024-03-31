'use client'

import { fetcher } from '@/helpers/fetcher'
import { useIsActive } from '@/store/use-active'
import { Match, Team } from '@prisma/client'
import useSWR from 'swr'
import ImagesMatches from '@/components/dates/image/images-matches'
import FormDateMatches from '@/components/dates/form/form-date-matches'
import ButtonDateMatchup from '@/components/dates/buttons/button-date-matchup'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const Matches = () => {
  const { isActive, activeId } = useIsActive((state) => ({
    isActive: state.isActive,
    activeId: state.id
  }))

  const {
    data: getMatches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher, {
    refreshInterval: 1000
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An ocurred a error!</p>
  }

  return (
    <ol className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {getMatches?.map((matchup) => (
        <li
          key={matchup.id}
          className='bg-custom-darkblue rounded-lg grid grid-cols-4 gap-4 p-4'
        >
          <ImagesMatches item={matchup} />

          {isActive && activeId === matchup.id ? (
            <FormDateMatches item={matchup} />
          ) : (
            <ButtonDateMatchup item={matchup} />
          )}
        </li>
      ))}
    </ol>
  )
}

export default Matches
