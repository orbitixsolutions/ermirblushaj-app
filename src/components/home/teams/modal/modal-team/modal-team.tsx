'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import BoardFootball from '@/components/home/teams/modal/modal-team/content/board-football'
import ListPlayers from '@/components/home/teams/modal/list/list-players'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
  ScrollShadow
} from '@nextui-org/react'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { fetcher } from '@/helpers/fetcher'
import { Player, Team } from '@prisma/client'
import useSWR from 'swr'

import 'swiper/css'
import 'swiper/css/pagination'
import './modal.css'

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
      size='xl'
      isOpen={isOpen}
      onOpenChange={onTeamModalClose}
      className='absolute bg-custom-darknavy text-custom-white'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex items-center gap-5'>
              <Avatar src={team?.logo!} />
              <h3>{team?.name}</h3>
            </ModalHeader>
            <ModalBody>
              <ScrollShadow
                hideScrollBar
                className='w-full max-w-[375px] mx-auto h-[400px] space-y-8'
              >
                <ListPlayers contentModal={contentModal} team={team!} />
                <BoardFootball team={team!} />
              </ScrollShadow>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalTeam
