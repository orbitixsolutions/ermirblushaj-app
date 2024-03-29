import { fetcher } from '@/helpers/fetcher'
import { Avatar, DropdownItem, Spinner } from '@nextui-org/react'
import { Match, Player, Team } from '@prisma/client'
import useSWR from 'swr'
import DropdownWrapper from '@/components/dates/dropdown/wrappers/dropdown-wrapper-team'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

type ExtendedPlayer = Team & {
  players: Player[]
}

export const DropdownTeamB = ({ item }: { item: ExtendedMatch }) => {
  const {
    data: team,
    isLoading,
    error
  } = useSWR<ExtendedPlayer>(`/api/teams/${item.teamB.id}`, fetcher, {
    revalidateOnFocus: true
  })

  if (isLoading) {
    return (
      <DropdownWrapper
        src={item.teamB.logo}
        name={item.teamB.name}
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
        src={item.teamB.logo}
        name={item.teamB.name}
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
      src={item.teamB.logo}
      name={item.teamB.name}
      render={
        team?.players.map((player) => (
          <DropdownItem textValue={player.firstName} key={player.id}>
            <div className='flex items-center gap-2'>
              <Avatar
                size='sm'
                src={player.profilePhoto || ''}
                name={player.firstName}
              />
              <h2 className='text-sm capitalize'>
                {player.firstName} {player.lastName}
              </h2>
            </div>
          </DropdownItem>
        )) as any
      }
    />
  )
}
