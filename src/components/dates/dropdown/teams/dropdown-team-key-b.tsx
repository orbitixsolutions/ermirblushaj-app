import { fetcher } from '@/helpers/fetcher'
import { Match, Player, Team } from '@prisma/client'
import { DropdownItem, Spinner } from '@nextui-org/react'
import { toast } from 'sonner'
import { updatedStats } from '@/actions/services/edit'
import DropdownTeamContent from '../content/dropdown-team-content'
import DropdownWrapper from '../wrappers/dropdown-wrapper-team'
import useSWR from 'swr'

type ExtendedMatch = Match & {
  teamKeyB: Team
}

type ExtendedPlayer = Team & {
  players: Player[]
}

const DropdownTeamKeyB = ({ match }: { match: ExtendedMatch }) => {
  const {
    data: team,
    isLoading,
    error
  } = useSWR<ExtendedPlayer>(`/api/teams/${match.teamKeyB.id}`, fetcher)

  console.log(team)

  const addGoalPlayer = async (player: Player) => {
    const { status } = await updatedStats(player)

    if (status === 200) {
      return toast.success(
        `Goal added for player: ${player.firstName} ${player.lastName}`
      )
    }
    return toast.error('An ocurred a error!')
  }

  if (isLoading) {
    return (
      <DropdownWrapper
        render={
          <DropdownItem textValue='loading-message' key='loading'>
            <Spinner size='lg' color='success' />
          </DropdownItem>
        }
      />
    )
  }

  if (error) {
    return (
      <DropdownWrapper
        render={
          <DropdownItem textValue='error-message' color='danger' key='error'>
            <h2 className='text-xl font-bold'>An ocurred a error!</h2>
          </DropdownItem>
        }
      />
    )
  }

  return (
    <DropdownWrapper
      render={team?.players.map((player) => (
        <DropdownItem
          key={player.id}
          textValue={player.firstName}
          onPress={() => addGoalPlayer(player)}
        >
          <DropdownTeamContent player={player} />
        </DropdownItem>
      ))}
    />
  )
}

export default DropdownTeamKeyB
