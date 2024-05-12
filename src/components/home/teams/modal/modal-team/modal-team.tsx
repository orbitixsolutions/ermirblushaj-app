'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
} from '@nextui-org/react'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { fetcher } from '@/helpers/fetcher'
import { Player, Team } from '@prisma/client'
import useSWR from 'swr'

import 'swiper/css'
import 'swiper/css/pagination'
import './modal.css'
import SwiperTeams from '../swiper/swiper-teams'

type ExtendedTeam = Team & {
  players: Player[]
}

const ModalTeam = ({ contentModal }: any) => {
  const { isOpen, teamId } = useModalTeamStore((state) => ({
    isOpen: state.teamModalOpen,
    teamId: state.teamModalId
  }))
  const onTeamModalClose = useModalTeamStore((state) => state.onTeamModalClose)

  const {
    data: team,
    isLoading,
    error
  } = useSWR<ExtendedTeam>(`/api/teams/full/${teamId}`, fetcher)

  if (error) return
  if (isLoading) return

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onOpenChange={onTeamModalClose}
      className='bg-custom-darknavy text-custom-white pb-5'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex items-center gap-5'>
              <Avatar src={team?.logo!} />
              <h3>{team?.name}</h3>
            </ModalHeader>
            <ModalBody>
              <SwiperTeams contentModal={contentModal} team={team!}/>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalTeam
