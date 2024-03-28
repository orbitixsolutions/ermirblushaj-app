import { Divider } from '@nextui-org/react'
import GroupTeams from '@/components/dates/list/group-teams'
import ButtonGroupGenerate from '@/components/dates/buttons/options/button-group-generate'
import ButtonMatchupGenerate from '@/components/dates/buttons/options/button-matchup-generate'
import Matches from '@/components/dates/list/matches'
import ButtonDeleteMatches from '@/components/dates/buttons/options/button-delete-matches'
import ButtonDeleteGroups from '@/components/dates/buttons/options/button-delete-groups'

const DatePage = () => {
  return (
    <section className='w-full container mx-auto py-20'>
      <div className='flex gap-4'>
        <ButtonGroupGenerate />
        <ButtonMatchupGenerate />
        <ButtonDeleteMatches />
        <ButtonDeleteGroups />
      </div>

      <GroupTeams />
      <Divider className='my-20 bg-custom-gray' orientation='horizontal' />
      <Matches />
    </section>
  )
}

export default DatePage
