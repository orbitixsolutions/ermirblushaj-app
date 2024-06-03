import { dataMatchesKeys, dataTopTeams } from '@/actions/services/data'
import { getTranslations } from 'next-intl/server'
import { Avatar, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import CrownImage from '@/assets/svg/crown.svg'
import MatchesEighths from '@/components/home/guides/matches/matches-eighths'
import MatchesQuarters from '@/components/home/guides/matches/matches-quarters'
import MatchesSemifinals from '@/components/home/guides/matches/matches-semifinals'
import MatchesFinal from '@/components/home/guides/matches/matches-final'
import ErrorMatchesKeys from '@/components/home/errors/error-matches-keys'
import { Team } from '@prisma/client'

const borderColors = {
  0: 'border-yellow-400',
  1: 'border-gray-400',
  2: 'border-orange-600'
}

const MatchesKeys = async () => {
  const content = await getTranslations('Keys')

  const { data: data_matches, status: status_matches } = await dataMatchesKeys()
  const { data: data_team_top, status: data_team_status } = await dataTopTeams()

  if (status_matches !== 200) return <ErrorMatchesKeys />
  if (data_team_status !== 200) return <ErrorMatchesKeys />

  const EMPTY_MATCHES = data_matches?.length === 0
  const MAX_MATCHES = data_matches?.length === 7

  if (MAX_MATCHES) return <TopTeams teams={data_team_top} />
  if (EMPTY_MATCHES) return

  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-16 px-5 flex'>
      <Card className='bg-custom-darknavy text-custom-white w-full rounded-none sm:rounded-xl sm:border-[1px] border-custom-tgray'>
        <CardHeader className='bg-custom-green py-4 rounded-none sm:rounded-xl'>
          <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
            {content('title')}
          </h2>
        </CardHeader>

        <CardBody>
          <div className='w-full flex items-center justify-between'>
            <MatchesEighths column='a' phase='EIGHTH' />

            <div className='flex justify-between items-center size-full max-w-[750px] px-3 relative'>
              <MatchesQuarters column='a' phase='QUARTER' />

              <div className='flex justify-between items-center size-full max-w-[500px] px-2 xs:px-4'>
                <MatchesSemifinals column='a' phase='SEMIFINALS' />

                <div className='flex justify-center size-full max-w-[150px] px-2 xs:px-4'>
                  <MatchesFinal column='none' phase='FINAL' />
                </div>

                <MatchesSemifinals column='b' phase='SEMIFINALS' />
              </div>

              <MatchesQuarters column='b' phase='QUARTER' />
            </div>

            <MatchesEighths column='b' phase='EIGHTH' />
          </div>
        </CardBody>
      </Card>
    </section>
  )
}

const TopTeams = async ({ teams }: { teams: Team[] | undefined }) => {
  const content = await getTranslations('Keys')

  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-16 px-5 flex flex-col text-custom-white space-y-8'>
      <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
        {content('top_team.title')}
      </h2>
      <ol className='w-full flex flex-col gap-4'>
        {teams?.map((team, index) => (
          <li key={team.id}>
            <Card
              className={`bg-custom-darkblue border-2 ${
                borderColors[index as keyof typeof borderColors] ||
                'border-gray-600'
              }`}
            >
              <CardBody className='flex flex-row items-center gap-4 w-full text-custom-white px-4'>
                <div>
                  {team.stageStatus === 'WINNER' && (
                    <Image
                      width={24}
                      src={CrownImage.src}
                      className='bg-transparent rounded-sm mb-1'
                      alt='Winner'
                    />
                  )}
                  <h2 className='font-bold text-6xl'>{index + 1}</h2>
                  <h2 className='text-center text-xl'>
                    {index + 1 === 1 ? 'st' : 'nd'}
                  </h2>
                </div>
                <Avatar size='lg' src={team.logo!} />
                <div>
                  <h2 className='font-bold'>{team.name}</h2>
                  <h2 className='text-custom-green'>
                    {team.stageStatus === 'WINNER' ? 'Tournament Winner' : ''}
                  </h2>
                </div>
              </CardBody>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default MatchesKeys
