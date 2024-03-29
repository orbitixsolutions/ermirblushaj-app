import { fetcher } from '@/helpers/fetcher'
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Spinner
} from '@nextui-org/react'
import { Match, Player, Team } from '@prisma/client'
import { DropdownTeamA } from '../teams/dropdown-team-a'
import { DropdownTeamB } from '../teams/dropdown-team-b'
import useSWR from 'swr'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

type ExtendedPlayer = Team & {
  players: Player[]
}

interface Props {
  name: string
  src: string | null
  render: JSX.Element
}

const DropdownWrapper = ({ render, name, src }: Props) => {
  return (
    <Dropdown className='bg-custom-darkblue text-white'>
      <DropdownTrigger>
        <Card className='aspect-square p-4 bg-custom-navy'>
          <Image
            className='size-full object-cover'
            src={src || ''}
            alt={`Logo team ${name}`}
          />
        </Card>
      </DropdownTrigger>
      <DropdownMenu aria-label='Team player list'>
        <DropdownSection title='Player List' showDivider>
          {render}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownWrapper
