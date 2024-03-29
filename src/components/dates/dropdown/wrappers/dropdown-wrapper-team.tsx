import {
  Card,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import { Match, Player, Team } from '@prisma/client'

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
    <Dropdown className='bg-custom-darknavy text-white'>
      <DropdownTrigger>
        <Card className='aspect-square p-4 cursor-pointer bg-custom-navy'>
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
