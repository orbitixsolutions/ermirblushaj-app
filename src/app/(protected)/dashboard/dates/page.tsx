import { Divider } from '@nextui-org/react'
import GroupTeams from '@/components/dates/list/group-teams'
import ButtonCreateMatches from '@/components/dates/buttons/options/button-create-matches'
import Matches from '@/components/dates/list/matches'
import ButtonDeleteMatches from '@/components/dates/buttons/options/button-delete-matches'
import ButtonDeleteGroups from '@/components/dates/buttons/options/button-delete-groups'
import ButtonCreateGroups from '@/components/dates/buttons/options/button-create-groups'
import ButtonDeleteStats from '@/components/dates/buttons/options/button-delete-stats'

const DatePage = () => {
  return (
    <section className='w-full container mx-auto py-20'>
      <div className='flex gap-4'>
        <ButtonCreateGroups />
        <ButtonCreateMatches />
        <ButtonDeleteMatches />
        <ButtonDeleteGroups />
        <ButtonDeleteStats />
      </div>

      <GroupTeams />
      <Divider className='my-20 bg-custom-gray' orientation='horizontal' />
      <Matches />
    </section>
  )
}

export default DatePage
