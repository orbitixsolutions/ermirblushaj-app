import { Image } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperButtons from './buttons/swiper-buttons'

import 'swiper/css'
import 'swiper/css/pagination'
import '../swiper.css'

const SwiperTournament = ({ gallery }: { gallery: TournamentGallery[] }) => {
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
          className='overflow-hidden relative rounded-xl w-full h-full'
        >
          <Image
            alt='Tournament image'
            className=''
            classNames={{
              wrapper: 'aspect-square w-full h-full'
            }}
            src={image.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperTournament
