'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Image
} from '@nextui-org/react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { TournamentGallery } from '@prisma/client'

import 'swiper/css'
import 'swiper/css/pagination'
import './swiper.css'

interface Props {
  title: string
  button: string
}

const ModalGallery = ({
  gallery,
  content
}: {
  content: Props
  gallery: TournamentGallery[]
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        fullWidth
        size='sm'
        radius='none'
        onPress={onOpen}
        className='bg-custom-blue font-bold text-xs'
      >
        {content.button}
      </Button>
      <Modal
        size='xl'
        className='bg-custom-darkblue text-custom-white'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <h2 className='text-center w-full font-bold'>
                  {content.title}
                </h2>
              </ModalHeader>
              <ModalBody>
                <Swiper
                  spaceBetween={20}
                  pagination={{
                    dynamicBullets: true
                  }}
                  loop={true}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  {gallery?.map((image) => (
                    <SwiperSlide
                      key={image.id}
                      className='overflow-hidden relative rounded-xl w-full h-full bg-custom-green'
                    >
                      <Image
                        src={image.url}
                        alt='Tournament image'
                        className='bg-transparent size-full object-cover aspect-square'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGallery
