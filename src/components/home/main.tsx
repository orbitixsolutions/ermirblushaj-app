import { useTranslations } from 'next-intl'

import { ManBradImage, PlayerBrandImage } from '@/assets/images'
import { Button, Image, Link } from '@nextui-org/react'

const Main = () => {
  const t = useTranslations('Main')

  return (
    <section className='flex max-w-[1024px] mx-auto py-8 md:py-24 px-5 justify-center lg:justify-between flex-wrap'>
      <div className='max-w-[620px]'>
        <h1 className='text-lg md:text-4xl lg:text-5xl font-bold text-center md:text-start text-custom-green'>
          {t('title')}
        </h1>
        <p className='max-w-[400px] mt-4 text-xs md:text-lg text-custom-white text-center md:text-start text-pretty'>
          {t('main_paragraph')}
        </p>

        <div className='flex justify-center md:justify-start my-8'>
          <Button
            as={Link}
            href='#dates'
            color='success'
            className='bg-custom-green font-bold'
            radius='full'
          >
            {t('main_button')}
          </Button>
        </div>
      </div>

      <div className='relative w-[400px] h-[300px]'>
        <div className='absolute w-[190px] h-[230px] top-0 right-[50%] translate-x-[50%]'>
          <Image src={ManBradImage.src} alt='Ermir Blushaj' />
        </div>
        <div className='absolute w-[311px] h-[230px] top-20 right-[50%] translate-x-[50%]'>
          <Image src={PlayerBrandImage.src} className='' alt='Ermir Blushaj' />
        </div>
      </div>
    </section>
  )
}

export default Main
