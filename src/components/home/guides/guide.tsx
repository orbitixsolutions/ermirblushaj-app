import { Date, Key, Team } from '@/assets/svg'
import { Avatar, Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import ModalKey from './modal/modal-key'

const Guide = () => {
  const t = useTranslations('Guide')

  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-16 px-5 flex flex-wrap text-custom-white'>
      <h2 className='text-xl md:text-2xl w-full font-bold text-center mb-8'>
        {t('title')}
      </h2>
      <div className='space-y-8 sm:space-y-0 w-full gap-4 sm:gap-8 md:gap-16 lg:gap-8 flex flex-wrap justify-center lg:justify-between items-start'>
        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Key.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {t('key.title')}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {t('key.description')}
          </p>

          <div className='flex justify-center'>
            <ModalKey content={t('key.button')} />
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Team.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {t('team.title')}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {t('team.description')}
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              {t('team.button')}
            </Button>
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar size='lg' src={Date.src} className='mx-auto bg-transparent' />
          <h2 className='text-lg md:text-2xl text-center font-bold'>
            {t('date.title')}
          </h2>
          <p className='text-center text-pretty text-sm sm:text-lg'>
            {t('date.description')}
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              {t('date.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
