'use client'

import { TributeGallery } from '@prisma/client'
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

import 'swiper/css'
import 'swiper/css/pagination'
import './swiper.css'
import SwiperTribute from './swiper/swiper-tribute'

interface Props {
  content: Content
  gallery: TributeGallery[]
}

interface Content {
  title: string
  gallery: {
    title: string
    modal_title: string
    button: string
  }
}

const ModalGallery = ({ gallery, content }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        radius='full'
        color='success'
        onPress={onOpen}
        className='bg-custom-blue font-bold px-8 mx-auto'
      >
        {content.gallery.button}
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
              <ModalHeader className='px-4 pb-0'>
                <h2 className='text-center w-full font-bold'>
                  {content.gallery.modal_title}
                </h2>
              </ModalHeader>
              <ModalBody className='p-4'>
                <SwiperTribute gallery={gallery} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGallery
