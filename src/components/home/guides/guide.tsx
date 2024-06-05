import { dataMatchesKeys } from '@/actions/services/data'
import { Date, Key, Team } from '@/assets/svg'
import { Avatar, Button, Link } from '@nextui-org/react'
import { getTranslations } from 'next-intl/server'

const Guide = async () => {
  const matchesKeys = await dataMatchesKeys()
  const data = matchesKeys.data?.length! > 1

  const t = await getTranslations('Guide')

  const contentGuide = {
    title: t('title'),
    key: {
      title: t('key.title'),
      description: t('key.description'),
      button: t('key.button')
    },
    team: {
      title: t('team.title'),
      description: t('team.description'),
      button: t('team.button')
    },
    date: {
      title: t('date.title'),
      description: t('date.description'),
      button: t('date.button')
    }
  }

  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-16 px-5 flex flex-wrap text-custom-white'>
      <h2 className='text-xl md:text-2xl w-full font-bold text-center mb-8'>
        {contentGuide.title}
      </h2>
      <div className='space-y-8 sm:space-y-0 w-full gap-4 sm:gap-8 md:gap-16 lg:gap-8 flex flex-wrap justify-center lg:justify-between items-start'>
        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Key.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {contentGuide.key.title}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {contentGuide.key.description}
          </p>

          <div className='flex justify-center'>
            <Button
              as={Link}
              href={data ? '#keys' : '#classification'}
              radius='full'
              className='bg-custom-green font-bold'
            >
              {contentGuide.key.button}
            </Button>
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Team.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {contentGuide.team.title}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {contentGuide.team.description}
          </p>

          <div className='flex justify-center'>
            <Button
              as={Link}
              href='#teams'
              radius='full'
              className='bg-custom-green font-bold'
            >
              {contentGuide.team.button}
            </Button>
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Date.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {contentGuide.date.title}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {contentGuide.date.description}
          </p>

          <div className='flex justify-center'>
            <Button
              as={Link}
              href='#dates'
              radius='full'
              className='bg-custom-green font-bold'
            >
              {contentGuide.date.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
