import { Card } from '@nextui-org/react'
import { getTranslations } from 'next-intl/server'
import { Team } from '@prisma/client'
import ButtonAvatar from './button/button-avatar'
import ModalTeam from './modal/modal-team/modal-team'
import prisma from '@/libs/prisma'

const getTeams = async () => {
  const teams = await prisma.team.findMany({
    orderBy: [{ name: 'asc' }, { createdDate: 'asc' }],
    take: 16
  })
  return teams as Team[]
}

const Teams = async () => {
  const teams = await getTeams()
  const content = await getTranslations('Teams')

  const contentModal = {
    no_players: content('modal.no_players'),
    years: content('modal.player_information.years'),
    position: content('modal.player_information.position'),
    height: content('modal.player_information.height'),
    positions: {
      goalkeeper: content('modal.player_information.positions.goalkeeper'),
      attacker: content('modal.player_information.positions.attacker')
    }
  }

  return (
    <>
      <section
        id='teams'
        className='max-w-[940px] mx-auto py-8 md:py-24 px-5 text-custom-white space-y-4'
      >
        <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
          {content('title')}
        </h2>
        <ol className='grid grid-cols-4 rounded-md overflow-hidden border-[1px]'>
          {teams?.map((team, index) => {
            const isLastItem = index === teams.length - 0
            const isSpecialItem = index % 4 === 0 || isLastItem
            const borderClass = isSpecialItem ? '' : 'border-l-[1px]'

            return (
              <li
                key={team.id}
                className={`aspect-square border-custom-lightgray ${borderClass}`}
              >
                <Card
                  radius='none'
                  className={`bg-transparent size-full p-3 xs:p-5 md:p-8  ${
                    index >= teams.length - 16 && index <= teams.length - 20
                      ? 'border-b-[1px]'
                      : 'border-b-[1px] border-t-[1px]'
                  }`}
                >
                  <ButtonAvatar team={team} />
                </Card>
                <h2 className='text-xs md:text-lg text-center font-light line-clamp-1 py-1.5'>
                  {team.name}
                </h2>
              </li>
            )
          })}
        </ol>
      </section>
      <ModalTeam contentModal={contentModal} />
    </>
  )
}

export default Teams
