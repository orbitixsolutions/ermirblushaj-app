'use client'

import { fetcher } from '@/helpers/fetcher'
import { useIsActive } from '@/store/use-active'
import { Match, Team } from '@prisma/client'
import useSWR from 'swr'
import ImagesMatches from '@/components/dates/image/images-matches'
import FormDateMatches from '@/components/dates/form/form-date-matches'
import ButtonDateMatchup from '@/components/dates/buttons/button-date-matchup'
import { Divider } from '@nextui-org/react'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const Matches = () => {
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
    <div className='w-[480px]'>
      <h2 className='text-5xl font-bold my-5 text-center'>Dates</h2>
      <ol className='w-full'>
        {getMatches?.map((matchup) => (
          <>
            <li
              key={matchup.id}
              className='rounded-lg flex flex-col items-start gap-4 py-4'
            >
              <MatchupItem matchup={matchup} />
            </li>
            <Divider className='bg-custom-lightgray' />
          </>
        ))}
      </ol>
    </div>
  )
}
export default Matches

const MatchupItem = ({ matchup }: { matchup: ExtendedMatch }) => {
  const { isActive, activeId } = useIsActive((state) => ({
    isActive: state.isActive,
    activeId: state.id
  }))

  return (
    <>
      <ImagesMatches match={matchup} />

      {isActive && activeId === matchup.id ? (
        <FormDateMatches match={matchup} />
      ) : (
        <ButtonDateMatchup match={matchup} />
      )}
    </>
  )
}
