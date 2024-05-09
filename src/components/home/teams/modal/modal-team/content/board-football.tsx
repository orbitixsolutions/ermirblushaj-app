import { newPlayersArray } from '@/helpers/get-player-positions'
import { Card, ScrollShadow } from '@nextui-org/react'
import { Player, Team } from '@prisma/client'
import FirstPlayer from '@/components/home/teams/modal/modal-team/positions/first-player'
import SecondPlayer from '@/components/home/teams/modal/modal-team/positions/second-player'
import ThirAndForthPlayer from '@/components/home/teams/modal/modal-team/positions/third-and-fourth-player'
import FifthPlayer from '@/components/home/teams/modal/modal-team/positions/fifth-player'

type ExtendedTeam = Team & {
  players: Player[]
}

const BoardFootball = ({ team }: { team: ExtendedTeam }) => {
  const players = team.players
  if (!players) return

  const player = newPlayersArray(players)

  return (
    <div>
      <Card className='h-[720px] border-2 border-custom-lightgray bg-transparent p-0 relative'>
        <div className='absolute top-0 left-[50%] -translate-x-[50%] w-full max-w-[210px] h-[45px] mx-auto border-r-2 border-l-2 border-b-2 border-custom-lightgray bg-transparent p-0 rounded-none rounded-br-md rounded-bl-md'>
          <div className='absolute top-0 left-[50%] -translate-x-[50%] w-full max-w-[122px] h-[25px] mx-auto border-r-2 border-l-2 border-b-2 border-custom-lightgray bg-transparent p-0 rounded-none rounded-br-md rounded-bl-md'></div>
        </div>

        <FirstPlayer player={player} />
        <SecondPlayer player={player} />
        <ThirAndForthPlayer player={player} />

        <div className='absolute bottom-0 left-[50%] -translate-x-[50%] w-full max-w-[210px] h-[45px] mx-auto border-r-2 border-l-2 border-t-2 border-custom-lightgray bg-transparent p-0 rounded-none rounded-tr-md rounded-tl-md'>
          <div className='absolute bottom-0 left-[50%] -translate-x-[50%] w-full max-w-[122px] h-[25px] mx-auto border-r-2 border-l-2 border-t-2 border-custom-lightgray bg-transparent p-0 rounded-none rounded-tr-md rounded-tl-md'></div>
          <FifthPlayer player={player} />
        </div>
      </Card>
    </div>
  )
}

export default BoardFootball
