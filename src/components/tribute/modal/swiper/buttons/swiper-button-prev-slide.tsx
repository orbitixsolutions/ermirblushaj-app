import { Button } from '@nextui-org/react'
import { useSwiper } from 'swiper/react'

const SwiperButtonPrevSlide = ({
  children,
  className
}: {
  className?: string
  children: React.ReactNode
}) => {
  const swiper = useSwiper()

  return (
    <Button className={className} isIconOnly onClick={() => swiper.slidePrev()}>
      {children}
    </Button>
  )
}

export default SwiperButtonPrevSlide
