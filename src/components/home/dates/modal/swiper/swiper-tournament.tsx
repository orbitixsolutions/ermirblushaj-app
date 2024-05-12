import { TournamentGallery } from '@prisma/client'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, Image } from '@nextui-org/react'
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
      className='w-full h-full rounded-xl'
    >
      <SwiperButtons colorIcon='text-custom-blue' size={32} />

      {gallery?.map((image) => (
        <SwiperSlide key={image.id}>
          <Image
            isBlurred
            src={image.url!}
            alt={image.id}
            className='aspect-square size-full object-cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperTournament
