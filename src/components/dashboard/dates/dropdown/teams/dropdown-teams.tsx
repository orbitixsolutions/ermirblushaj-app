import { fetcher } from '@/helpers/fetcher'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '@nextui-org/react'
import { Player, Team } from '@prisma/client'
import { updatedStats } from '@/actions/services/edit'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'
import DropdownTeamContent from '@/components/dashboard/dates/dropdown/content/dropdown-team-content'

type ExtendedTeams = Team & {
  players: Player[]
}

const DropdownTeams = ({
  children,
  team
}: {
  children: React.ReactNode
  team: Team
}) => {
  const teamId = team.id

  const { data: data_team } = useSWR<ExtendedTeams>(
    `/api/teams/full/${teamId}`,
    fetcher
  )

  const players = data_team?.players || []
  const emptyPlayers = players.length !== 0

  // Añaadir un gol a un jugador
  const addGoalPlayer = async (player: Player) => {
    const res = await updatedStats(player)

    if (res.status === 200) {
      toast.success(
        `Goal added for player: ${player.firstName} ${player.lastName}`
      )
      mutate('/api/matches')
      return
    }

    return toast.error('An ocurred a error!')
  }

  return (
    <Dropdown className='bg-custom-darkblue text-custom-white'>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label='Show players' disabledKeys={['empty']}>
        <DropdownSection
          title='Players'
          classNames={{
            heading: 'text-xl font-bold text-custom-white'
          }}
        >
          {emptyPlayers ? (
            players.map((player) => (
              <DropdownItem
                onPress={() => addGoalPlayer(player)}
                textValue={player.firstName}
                key={player.id}
              >
                <DropdownTeamContent player={player} />
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key='empty' textValue='no_players'>
              <p>No players available.</p>
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownTeams
