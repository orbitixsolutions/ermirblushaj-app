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
        className='bg-custom-darknavy text-custom-white'
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className=''>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className='text-center text-2xl w-full font-bold'>
                  Tournament Keys
                </h2>
              </ModalHeader>
              <ModalBody>
                {/* TODO: Hacer las llaves responsive - Mobile 320px */}
                <div className='w-full max-w-[700px] flex justify-between mx-auto relative'>
                  <MatchesEighths column='A' phase='EIGHTH' />
                  <div className='flex mx-3 w-full h-full max-w-[500px] justify-between items-center translate-y-3'>
                    <MatchesQuarters column='A' phase='QUARTER' />
                    <div className='flex mx-3 w-full h-full max-w-[315px] justify-between items-center translate-y-1'>
                      <MatchesSemifinals column='A' phase='SEMIFINALS' />
                      <div className='flex mx-3 w-full h-full  max-w-[100px] justify-center items-center'>
                        <MatchesFinal column='NONE' phase='final' />
                      </div>
                      <MatchesSemifinals column='B' phase='SEMIFINALS' />
                    </div>
                    <MatchesQuarters column='B' phase='QUARTER' />
                  </div>
                  <MatchesEighths column='B' phase='EIGHTH' />
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
