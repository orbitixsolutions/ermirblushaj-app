import { fetcher } from '@/helpers/fetcher'
import { Avatar, DropdownItem, Spinner } from '@nextui-org/react'
import { Match, Player, Team } from '@prisma/client'
import useSWR from 'swr'
import DropdownWrapper from '@/components/dates/dropdown/wrappers/dropdown-wrapper-team'
import DropdownTeamContent from '../content/dropdown-team-content'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

type ExtendedPlayer = Team & {
  players: Player[]
}

export const DropdownTeamA = ({ item }: { item: ExtendedMatch }) => {
  const {
    data: team,
    isLoading,
    error
  } = useSWR<ExtendedPlayer>(`/api/teams/${item.teamA.id}`, fetcher, {
    revalidateOnFocus: true
  })

  if (isLoading) {
    return (
      <DropdownWrapper
        src={item.teamA.logo}
        name={item.teamA.name}
        id=''
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
        src={item.teamA.logo}
        name={item.teamA.name}
        id=''
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
      src={item.teamA.logo}
      name={item.teamA.name}
      id=''
      render={
        team?.players.map((player) => (
          <DropdownItem textValue={player.firstName} key={player.id}>
            <DropdownTeamContent player={player} />
          </DropdownItem>
        )) as any
      }
    />
  )
}
