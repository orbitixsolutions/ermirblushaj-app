import { getTranslations } from 'next-intl/server'
import { Team } from '@prisma/client'
import ModalTeam from '@/components/home/teams/modal/modal-team/modal-team'
import prisma from '@/libs/prisma'
import TeamItem from '@/components/home/teams/team-item'

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
      {teams?.length && (
        <>
          <section
            id='teams'
            className='max-w-[940px] mx-auto py-8 md:py-24 px-5 text-custom-white space-y-4'
          >
            <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
              {content('title')}
            </h2>
            <ol className='grid grid-cols-4 rounded-md overflow-hidden border-[1px] p-2 gap-1'>
              {teams?.map((team) => (
                <TeamItem key={team.id} team={team} />
              ))}
            </ol>
          </section>
          <ModalTeam contentModal={contentModal} />
        </>
      )}
    </>
  )
}

export default Teams
