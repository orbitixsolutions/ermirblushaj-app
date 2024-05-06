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
        className='bg-custom-darknavy text-custom-white'
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className=''>
          {() => (
            <>
              <ModalHeader>
                <h2 className='text-center text-2xl w-full font-bold'>
                  Tournament Keys
                </h2>
              </ModalHeader>
              <ModalBody>
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
