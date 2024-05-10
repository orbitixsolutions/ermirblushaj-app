import { deleteKeyMatches } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { updatedData } from '@/helpers/updated-data'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { Match } from '@prisma/client'
import { IconAlertOctagon } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const ButtonDeleteKeyMatches = () => {
  const [isPending, startTransition] = useTransition()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { data: key_matches } = useSWR<Match[]>('/api/matches/keys', fetcher)
  const EMPTY_KEY_MATCHES = !key_matches?.length

  const handleDeleteKeyMatchup = () => {
    if (EMPTY_KEY_MATCHES) {
      return toast.error('There are not key matches created!')
    }

    startTransition(async () => {
      const { status, message } = await deleteKeyMatches()

      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      if (status === 409) {
        toast.error(message)
        return
      }

      toast.error('An occurred error while deleting matches!')
      return
    })
  }

  return (
    <>
      <Button
        fullWidth
        color='danger'
        onPress={onOpen}
        isLoading={isPending}
        isDisabled={EMPTY_KEY_MATCHES}
        startContent={<IconAlertOctagon />}
        className='mx-auto bg-custom-red font-bold'
      >
        Delete Matches
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='bg-custom-darkblue text-custom-white'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <h4 className='text-xl font-bold text-center'>
                  Delete Matches
                </h4>
              </ModalHeader>
              <ModalBody>
                <p className='text-center'>
                  Are you sure you want to delete all matches?
                </p>
              </ModalBody>
              <ModalFooter className='grid grid-cols-2'>
                <Button
                  color='danger'
                  className='bg-custom-red font-bold'
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color='success'
                  isLoading={isPending}
                  className='bg-custom-green font-bold'
                  onPress={handleDeleteKeyMatchup}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ButtonDeleteKeyMatches
