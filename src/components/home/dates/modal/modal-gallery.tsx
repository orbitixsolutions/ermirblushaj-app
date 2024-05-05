'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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

const ModalGallery = ({
  gallery,
  content
}: {
  content: string
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
        {content}
      </Button>
      <Modal
        size='xl'
        className='bg-custom-darkblue text-custom-white'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className='text-center w-full font-bold'>
                  Tournament Gallery
                </h2>
              </ModalHeader>
              <ModalBody>
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    dynamicBullets: true
                  }}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  {gallery?.map((image) => (
                    <SwiperSlide key={image.id} className='size-full'>
                      <Image
                        src={image.url}
                        alt='Tournament image'
                        className='bg-transparent size-full object-cover aspect-square'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color='danger'
                  onPress={onClose}
                  className='bg-custom-red font-bold text-xs'
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGallery
