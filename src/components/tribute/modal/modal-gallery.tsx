'use client'

import { TributeGallery } from '@prisma/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react'

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
        size='2xl'
        isOpen={isOpen}
        onClose={onClose}
        className='bg-custom-darkblue text-custom-white pb-5'
      >
        <ModalContent>
          {() => (
            <> 
              <ModalHeader className='px-4 pb-0'>
                <h2 className='text-center w-full font-bold'>
                  {content.gallery.modal_title}
                </h2>
              </ModalHeader>
              <ModalBody className='select-none'>
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
