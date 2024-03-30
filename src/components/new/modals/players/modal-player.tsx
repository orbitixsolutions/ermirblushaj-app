'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SelectItem,
  Select,
  Input
} from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { usePlayerModal } from '@/hooks/player-hooks/use-player-modal'
import { Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import ImagePreviewPlayer from '@/components/new/image/players/image-preview-player'

const ModalPlayer = () => {
  const { data: teams } = useSWR<Team[]>('/api/teams', fetcher)

  const {
    playerModalOpen,
    playerModalEdit,
    teamData,
    control,
    isPending,
    onSubmit,
    onPlayerModalClose
  } = usePlayerModal()

  return (
    <Modal
      isOpen={playerModalOpen}
      className='bg-custom-navy px-12 py-8'
      onOpenChange={() => onPlayerModalClose()}
      size='5xl'
    >
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className='w-full flex justify-between'>
            <h2 className='text-2xl uppercase text-custom-white font-bold'>
              {playerModalEdit ? 'Edit player' : 'Add player'}
            </h2>
            {teamData.name !== '' && (
              <h2 className='text-2xl uppercase text-custom-white font-bold'>
                TEAM: <span className='text-custom-green'>{teamData.name}</span>
              </h2>
            )}
          </ModalHeader>
          <ModalBody>
            <div className='grid grid-cols-12 gap-4 text-slate-900'>
              <div className='col-span-8 grid grid-cols-4 gap-4'>
                <Controller
                  name='first_name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='text'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='First name'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='last_name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='text'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='Last name'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='date_birthday'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='date'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='number'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='number'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='Number of player'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='height'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='number'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='1.80'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='nationality'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className='col-span-2'
                      type='text'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='Colombia'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='position'
                  control={control}
                  render={({ field }) => (
                    <Input
                      className={`${
                        !playerModalEdit && teamData.id === ''
                          ? 'col-span-2'
                          : 'col-span-4'
                      }  `}
                      type='text'
                      size='lg'
                      isDisabled={isPending}
                      radius='md'
                      placeholder='Position'
                      {...field}
                    />
                  )}
                />
                {!playerModalEdit && teamData.id === '' && (
                  <Controller
                    name='team_id'
                    control={control}
                    render={({ field }) => (
                      <Select
                        className='col-span-2'
                        size='lg'
                        aria-labelledby='Team select'
                        isDisabled={playerModalEdit || isPending}
                        radius='md'
                        placeholder='Select a team'
                        {...field}
                      >
                        {teams ? (
                          teams.map((item) => (
                            <SelectItem
                              className='text-slate-900'
                              value={item.id}
                              key={item.id}
                            >
                              {item.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p>Loading...</p>
                        )}
                      </Select>
                    )}
                  />
                )}
              </div>
              <div className='col-span-4 grid grid-cols-4 rounded-md overflow-hidden'>
                <ImagePreviewPlayer />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isPending}
              type='submit'
              className='bg-custom-green font-bold uppercase text-xl w-full'
            >
              {playerModalEdit ? 'Edit' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalPlayer
