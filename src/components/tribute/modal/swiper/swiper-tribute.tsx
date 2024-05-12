import { Swiper, SwiperSlide } from 'swiper/react'
import { Image } from '@nextui-org/react'
import { Pagination } from 'swiper/modules'
import { TributeGallery } from '@prisma/client'
import SwiperButtons from './buttons/swiper-buttons'

import 'swiper/css'
import 'swiper/css/pagination'
import '../swiper.css'

const SwiperTribute = ({ gallery }: { gallery: TributeGallery[] }) => {
  return (
    <Swiper
      spaceBetween={20}
      pagination={{
        dynamicBullets: true
      }}
      loop={true}
      modules={[Pagination]}
      className='w-full h-full'
    >
      <SwiperButtons colorIcon='text-custom-blue' size={32} />

      {gallery?.map((image) => (
        <SwiperSlide
          key={image.id}
          className='overflow-hidden relative rounded-xl'
        >
          <Image
            alt='Tributte image'
            className='object-cover'
            classNames={{
              wrapper: 'aspect-square w-full h-full'
            }}
            src={image.url!}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperTribute
