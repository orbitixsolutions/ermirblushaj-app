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
    <footer className='py-20 bg-custom-teal'>
      <div className='max-w-[250px] mx-auto space-y-20 text-custom-white'>
        <Image radius='none' src={BrandLogo.src} alt='Logo' className='w-32' />

        <div className='flex justify-between'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Social</h3>

            <ol className='flex flex-col space-y-4'>
              <li className='flex items-center gap-2'>
                <IconBrandFacebookFilled />{' '}
                <span className='text-custom-lightgray/80 text-xs'>
                  Social Media
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <IconBrandInstagram />{' '}
                <span className='text-custom-lightgray/80 text-xs'>
                  Social Media
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <IconBrandTiktok />{' '}
                <span className='text-custom-lightgray/80 text-xs'>
                  Social Media
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <IconBrandWhatsapp />{' '}
                <span className='text-custom-lightgray/80 text-xs'>
                  Social Media
                </span>
              </li>
            </ol>
          </div>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Contact</h3>
            <ol className='flex flex-col space-y-4'>
              <li className='flex items-center gap-2'>
                <IconBrandWhatsapp />{' '}
                <span className='text-custom-lightgray/80 text-xs'>
                  +57 326 251 1515
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-custom-lightgray/80 text-xs'>
                  +57 326 251 1515
                </span>
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-custom-lightgray/80 text-xs'>
                  +57 326 251 1515
                </span>
              </li>
            </ol>
          </div>
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl font-bold'>Visit</h3>

          <ol className='space-y-6'>
            <li>
              <p className='text-custom-lightgray/80 text-xs'>
                Crra 42 #### San isidro
              </p>
            </li>
            <li>
              <p className='text-custom-lightgray/80 text-xs'>
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
