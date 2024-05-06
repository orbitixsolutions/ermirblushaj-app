import { fetcher } from '@/helpers/fetcher'
import { Spinner } from '@nextui-org/react'
import MatchesEighths from '@/components/home/guides/matches/matches-eighths'
import MatchesQuarters from '@/components/home/guides/matches/matches-quarters'
import MatchesSemifinals from '@/components/home/guides/matches/matches-semifinals'
import MatchesFinal from '@/components/home/guides/matches/matches-final'
import ErrorMatches from '@/components/home/errors/error-matches'
import NoMatches from '@/components/home/empty-items/no-matches'
import useSWR from 'swr'

const Matches = () => {
  const {
    data: key_matches,
    isLoading,
    error
  } = useSWR('/api/matches/keys', fetcher)

  const EMPTY_MATCHES = key_matches?.length === 0
  if (EMPTY_MATCHES) return <NoMatches message='Comming Soon...' />

  if (error) return <ErrorMatches message='An ocurred a error.' />

  if (isLoading)
    return (
      <div className='aspect-video size-full grid place-items-center'>
        <Spinner size='lg' className='scale-150' />
      </div>
    )

  return (
    <div className='w-full max-w-[700px] flex items-center justify-between mx-auto'>
      <MatchesEighths column='A' phase='EIGHTH' />

      <div className='flex justify-between items-center size-full max-w-[500px] px-3'>
        <MatchesQuarters column='A' phase='QUARTER' />

        <div className='flex justify-between items-center size-full max-w-[300px] px-2 xs:px-4'>
          <MatchesSemifinals column='A' phase='SEMIFINALS' />

          <div className='flex justify-center size-full max-w-[150px] px-2 xs:px-4'>
            <MatchesFinal column='NONE' phase='FINAL' />
          </div>

          <MatchesSemifinals column='B' phase='SEMIFINALS' />
        </div>

        <MatchesQuarters column='B' phase='QUARTER' />
      </div>

      <MatchesEighths column='B' phase='EIGHTH' />
    </div>
  )
}

export default Matches
