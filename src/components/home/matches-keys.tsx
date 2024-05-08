import { dataMatchesKeys } from '@/actions/services/data'
import { getTranslations } from 'next-intl/server'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import MatchesEighths from '@/components/home/guides/matches/matches-eighths'
import MatchesQuarters from '@/components/home/guides/matches/matches-quarters'
import MatchesSemifinals from '@/components/home/guides/matches/matches-semifinals'
import MatchesFinal from '@/components/home/guides/matches/matches-final'
import ErrorMatchesKyes from '@/components/home/errors/error-matches-keys'

const MatchesKeys = async () => {
  const content = await getTranslations('Keys')
  const { data, status } = await dataMatchesKeys()

  if (status !== 200) return <ErrorMatchesKyes />

  const EMPTY_MATCHES = data?.length === 0
  if (EMPTY_MATCHES) return

  return (
    <section id='keys' className='w-full max-w-[700px] mx-auto py-8 md:py-24'>
      <Card className='bg-custom-darknavy text-custom-white rounded-none sm:rounded-xl sm:border-[1px] border-custom-lightgray'>
        <CardHeader className='bg-custom-green py-4 rounded-none sm:rounded-xl'>
          <h2 className='w-full text-xl md:text-2xl font-bold text-center'>
            {content('title')}
          </h2>
        </CardHeader>
        <CardBody className='px-8 sm:px-5'>
          <div className='w-full flex items-center justify-between'>
            <MatchesEighths column='A' phase='EIGHTH' />

            <div className='flex justify-between items-center size-full max-w-[500px] px-3 relative'>
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
        </CardBody>
      </Card>
    </section>
  )
}

export default MatchesKeys
