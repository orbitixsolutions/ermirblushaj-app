import { BrandLogo } from '@/assets/images'
import { Image } from '@nextui-org/react'
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp
} from '@tabler/icons-react'

const Footer = () => {
  return (
    <footer className='py-16 md:py-24 px-12 text-custom-white bg-custom-teal'>
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
          <h3 className='text-xl font-bold'>Social</h3>
          <ol className='flex flex-col space-y-4'>
            <li className='flex items-center gap-2'>
              <IconBrandFacebookFilled />{' '}
              <span className='text-custom-lightgray/80 text-xs md:text-lg'>
                Social Media
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <IconBrandInstagram />{' '}
              <span className='text-custom-lightgray/80 text-xs md:text-lg'>
                Social Media
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <IconBrandTiktok />{' '}
              <span className='text-custom-lightgray/80 text-xs md:text-lg'>
                Social Media
              </span>
            </li>
            <li className='flex items-center gap-2 w-[200px]'>
              <IconBrandWhatsapp />{' '}
              <span className='text-custom-lightgray/80 text-xs md:text-lg'>
                Social Media
              </span>
            </li>
          </ol>
        </div>

        <div className='col-span-8 xs:col-span-4 md:col-span-2 space-y-4 text-start xs:text-end md:text-start'>
          <h3 className='text-xl font-bold'>Contact</h3>
          <ol className='grid grid-cols-4 gap-4'>
            <li className='col-span-4 flex items-center xs:justify-end md:justify-start gap-2'>
              <IconBrandWhatsapp />
              <span className=' text-custom-lightgray/80 text-xs md:text-base'>
                +57 326 251 1515
              </span>
            </li>
            <li className='col-span-4'>
              <span className=' text-custom-lightgray/80 text-xs md:text-base'>
                +57 326 251 1515
              </span>
            </li>
            <li className='col-span-4'>
              <span className=' text-custom-lightgray/80 text-xs md:text-base'>
                +57 326 251 1515
              </span>
            </li>
          </ol>
        </div>

        <div className='col-span-8 xs:col-span-4 md:col-span-2 space-y-4'>
          <h3 className='text-xl font-bold'>Visit</h3>

          <ol className='space-y-6'>
            <li>
              <p className='text-custom-lightgray/80 text-xs md:text-base'>
                Crra 42 #### San isidro
              </p>
            </li>
            <li>
              <p className='text-custom-lightgray/80 text-xs md:text-base'>
                Crra 42 #### San isidro
              </p>
            </li>
          </ol>
        </div>
      </div>
    </footer>
  )
}

export default Footer
