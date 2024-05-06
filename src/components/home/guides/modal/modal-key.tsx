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
import MatchesEighths from '../matches/matches-eighths'
import MatchesQuarters from '../matches/matches-quarters'
import MatchesSemifinals from '../matches/matches-semifinals'
import MatchesFinal from '../matches/matches-final'

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
        className='bg-custom-darkblue text-custom-white'
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className='text-center w-full font-bold'>Keys</h2>
              </ModalHeader>
              <ModalBody>
                <div className='w-full h-[668px] flex justify-between mx-auto relative'>
                  {/* Column A */}
                  <MatchesEighths column='A' phase='EIGHTH' />

                  {/* Column B */}
                  <MatchesEighths column='B' phase='EIGHTH' />

                  {/* Final */}
                  {/* <MatchesFinal column='NONE' phase='final' /> */}
                </div>
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

export default ModalKey
