'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react'

import { TournamentGallery } from '@prisma/client'
import SwiperTournament from './swiper/swiper-tournament'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
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
              <ModalBody className='select-none'>
                <SwiperTournament gallery={gallery} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGallery
