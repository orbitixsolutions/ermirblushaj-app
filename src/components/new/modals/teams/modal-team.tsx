'use client'

import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Modal
} from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { useTeamModal } from '@/hooks/team-hooks/use-team-modal'
import ImageDropzoneTeam from '@/components/new/image/teams/image-dropzone-team'

const ModalTeam = () => {
  const {
    teamModalOpen,
    teamModalEdit,
    isPending,
    control,
    onSubmit,
    onTeamModalClose
  } = useTeamModal()

  return (
    <Modal
      isOpen={teamModalOpen}
      className='bg-custom-navy px-2 md:px-5 py-4 md:py-8'
      onOpenChange={() => onTeamModalClose()}
      size='xl'
    >
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className='w-full flex justify-between'>
            <h2 className='text-base md:text-2xl uppercase text-custom-white font-bold'>
              {teamModalEdit ? 'Edit team ' : 'Create team'}
            </h2>
          </ModalHeader>
          <ModalBody className='flex flex-col gap-2 md:gap-4'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  isDisabled={isPending}
                  className='text-slate-950'
                  placeholder='Write team name'
                  {...field}
                />
              )}
            />
            <ImageDropzoneTeam />
          </ModalBody>
          <ModalFooter>
            <Button
              type='submit'
              isLoading={isPending}
              className='bg-custom-green font-bold uppercase text-sm md:text-xl w-full'
            >
              {teamModalEdit ? 'Edit' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalTeam
