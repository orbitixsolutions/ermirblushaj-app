import { fetcher } from '@/helpers/fetcher'
import { DropdownItem, Spinner } from '@nextui-org/react'
import { Match, Player, Team } from '@prisma/client'
import { updatedStats } from '@/actions/services/edit'
import { toast } from 'sonner'
import DropdownWrapper from '@/components/dashboard/dates/dropdown/wrappers/dropdown-wrapper-team'
import DropdownTeamContent from '@/components/dashboard/dates/dropdown/content/dropdown-team-content'
import useSWR from 'swr'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

type ExtendedPlayer = Team & {
  players: Player[]
}

export const DropdownTeamA = ({ match }: { match: ExtendedMatch }) => {
  const {
    data: team,
    isLoading,
    error
  } = useSWR<ExtendedPlayer>(`/api/teams/${match.teamA.id}`, fetcher, {
    revalidateOnFocus: true
  })

  const addGoalPlayer = async (player: Player) => {
    const res = await updatedStats(player)

    if (res.status === 200) {
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
      render={
        team?.players.map((player) => (
          <DropdownItem
            key={player.id}
            textValue={player.firstName}
            onPress={() => addGoalPlayer(player)}
          >
            <DropdownTeamContent player={player} />
          </DropdownItem>
        )) as any
      }
    />
  )
}
