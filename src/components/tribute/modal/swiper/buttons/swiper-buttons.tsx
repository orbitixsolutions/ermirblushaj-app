import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import SwiperButtonPrevSlide from './swiper-button-prev-slide'
import SwiperButtonNextSlide from './swiper-button-next-slide'

const SwiperButtons = ({
  colorIcon,
  colorWrapper,
  size
}: {
  colorIcon?: string
  colorWrapper?: string
  size?: number
}) => {
  return (
    <>
      <SwiperButtonPrevSlide
        className={`absolute z-50 top-[50%] -translate-y-[50%] left-4 ${colorWrapper}`}
      >
        <IconArrowLeft className={colorIcon} size={size} />
      </SwiperButtonPrevSlide>

      <SwiperButtonNextSlide
        className={`absolute z-50 top-[50%] -translate-y-[50%] right-4 ${colorWrapper}`}
      >
        <IconArrowRight className={colorIcon} size={size} />
      </SwiperButtonNextSlide>
    </>
  )
}

export default SwiperButtons
