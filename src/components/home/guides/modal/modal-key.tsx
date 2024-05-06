'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import Matches from '@/components/home/guides/modal/content/matches'

const ModalKey = ({ content }: { content: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        radius='full'
        className='bg-custom-green font-bold'
      >
        {content}
      </Button>
      <Modal
        className='absolute bg-custom-darknavy border-2 border-custom-green text-custom-white'
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className='h-full md:min-h-[670px] relative'>
                <h2 className='text-xs sm:text-lg md:text-2xl font-bold left-[50%] -translate-x-[50%] absolute mt-2 text-custom-green'>
                  Keys Tournament
                </h2>
                <Matches />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalKey
