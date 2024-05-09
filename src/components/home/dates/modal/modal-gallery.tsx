'use client'

import { TournamentGallery } from '@prisma/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react'

import SwiperTournament from './swiper/swiper-tournament'

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
        size='2xl'
        isOpen={isOpen}
        onClose={onClose}
        className='bg-custom-darkblue text-custom-white'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='px-4 pb-0'>
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
