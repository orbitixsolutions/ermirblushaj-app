import { Divider } from '@nextui-org/react'
import GroupTeams from '@/components/dates/list/group-teams'
import Matches from '@/components/dates/list/matches'

const DatePage = () => {
  return (
    <section className='w-full container mx-auto py-20'>
      <GroupTeams />
      <Divider className='my-20 bg-custom-gray' orientation='horizontal' />
      <Matches />
    </section>
  )
}

export default DatePage
