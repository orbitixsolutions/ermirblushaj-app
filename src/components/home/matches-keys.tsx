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
    <section className='max-w-[1280px] mx-auto py-8 md:py-16 px-5 flex'>
      <Card className='bg-custom-darknavy text-custom-white w-full rounded-none sm:rounded-xl sm:border-[1px] border-custom-tgray'>
        <CardHeader className='bg-custom-green py-4 rounded-none sm:rounded-xl'>
          <h2 className='text-2xl xl:text-5xl mx-auto font-bold text-center'>
            Keys Tournament
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

export default MatchesKeys
