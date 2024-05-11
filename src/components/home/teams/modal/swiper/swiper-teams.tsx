import { Pagination } from 'swiper/modules'
import { Player, Team } from '@prisma/client'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperButtons from './buttons/swiper-buttons'
import ListPlayers from '../list/list-players'
import BoardFootball from '../modal-team/content/board-football'

type ExtendedTeam = Team & {
  players: Player[]
}

const SwiperTeams = ({
  contentModal,
  team
}: {
  contentModal: any
  team: ExtendedTeam
}) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true
      }}
      modules={[Pagination]}
      className='w-full h-full'
    >
      <SwiperButtons colorIcon='text-custom-blue' size={32} />
      <SwiperSlide>
        <ListPlayers contentModal={contentModal} team={team!} />
      </SwiperSlide>
      <SwiperSlide>
        <BoardFootball team={team!} />
      </SwiperSlide>
    </Swiper>
  )
}

export default SwiperTeams
