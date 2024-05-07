import { Avatar, Card } from '@nextui-org/react'
import { getTranslations } from 'next-intl/server'
import { Team } from '@prisma/client'
import prisma from '@/libs/prisma'

import ButtonAvatar from './button/button-avatar'
import ModalTeam from './modal/modal-team/modal-team'

const getTeams = async () => {
  const teams = await prisma.team.findMany()
  return teams as Team[]
}

const Teams = async () => {
  const teams = await getTeams()
  const content = await getTranslations('Teams')

  return (
    <>
      <section
        id='teams'
        className='max-w-[940px] mx-auto py-8 md:py-16 px-5 text-custom-white space-y-4'
      >
        <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
          {content('title')}
        </h2>
        <ol className='grid grid-cols-5 rounded-md overflow-hidden border-[1px]'>
          {teams?.map((team, index) => {
            const isLastItem = index === teams.length - 0
            const isSpecialItem = index % 5 === 0 || isLastItem
            const borderClass = isSpecialItem ? '' : 'border-l-[1px]'

            return (
              <li
                key={team.id}
                className={`aspect-square border-custom-lightgray ${borderClass}`}
              >
                <Card
                  radius='none'
                  className={`bg-transparent size-full p-3 xs:p-5 md:p-8  ${
                    index >= teams.length - 20 && index <= teams.length - 16
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
      <ModalTeam />
    </>
  )
}

export default Teams
