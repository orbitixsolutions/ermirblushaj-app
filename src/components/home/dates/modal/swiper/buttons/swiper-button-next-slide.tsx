import { Button } from '@nextui-org/react'
import { useSwiper } from 'swiper/react'

const SwiperButtonNextSlide = ({
  children,
  className
}: {
  className?: string
  children: React.ReactNode
}) => {
  const swiper = useSwiper()

  return (
    <Button className={className} isIconOnly onClick={() => swiper.slideNext()}>
      {children}
    </Button>
  )
}

export default SwiperButtonNextSlide
