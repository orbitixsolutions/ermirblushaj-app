import { BrandLogo } from '@/assets/images'
import { Image, Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { phonesNumbers, social, streets } from './data'
import {  IconHeartFilled } from '@tabler/icons-react'

const Footer = () => {
  const content = useTranslations('Footer')

  return (
    <footer className='h-[375px] py-16 md:py-24 px-12 text-custom-white bg-custom-teal relative'>
      <div className='max-w-[1354px] mx-auto grid grid-cols-8 gap-y-12 md:gap-8'>
        <div className='col-span-8 md:col-span-2'>
          <Image
            radius='none'
            src={BrandLogo.src}
            alt='Logo'
            className='w-32 md:w-48'
          />
        </div>

        <div className='col-span-8 xs:col-span-4 md:col-span-2 space-y-4'>
          <h3 className='text-xl font-bold'>{content('social.title')}</h3>
          <ol className='flex flex-col space-y-4'>
            {social.map((item, index) => (
              <li key={index} className='flex items-center gap-2'>
                {item.icon}{' '}
                <Link
                  isExternal
                  href={item.link}
                  className='text-custom-lightgray/80 text-xs md:text-lg'
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className='col-span-8 xs:col-span-4 md:col-span-2 space-y-4 text-start xs:text-end md:text-start'>
          <h3 className='text-xl font-bold'> {content('contact.title')}</h3>
          <ol className='grid grid-cols-4 gap-4'>
            {phonesNumbers.map((phone, index) => (
              <li key={index} className='col-span-4'>
                <span className='text-custom-lightgray/80 text-xs md:text-base'>
                  {phone.number}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className='col-span-8 xs:col-span-4 md:col-span-2 space-y-4'>
          <h3 className='text-xl font-bold'>{content('visit.title')}</h3>

          <ol className='space-y-6'>
            {streets.map((street, index) => (
              <li key={index}>
                <p className='text-custom-lightgray/80 text-xs md:text-base'>
                  {street.street}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className='absolute bottom-0 left-0 flex items-center gap-4 w-full'>
          <h2 className='text-center mx-auto text-lg pb-2'>
            Make by{' '}
            <Link
              isExternal
              href='https://bzsoftwares.com/'
              className='text-custom-white hover:underline'
            >
              BzSoftwares
            </Link>{' '}
            {/* with{' '}
            <Link
              isExternal
              href='/https://migueljm.vercel.app/'
              className='text-custom-white hover:underline'
            >
              Miguel Angel
            </Link> */}
          </h2>
        </div>
      </div>
    </footer>
  )
}

export default Footer
