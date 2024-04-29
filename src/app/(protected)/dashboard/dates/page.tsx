import { Divider } from '@nextui-org/react'
import GroupTeams from '@/components/dates/list/group-teams'
import WrapperMatches from '@/components/gallery/wrappers/wrapper-matches'

const DatePage = () => {
  return (
    <section className='w-full container mx-auto py-20'>
      <GroupTeams />
      <Divider className='my-20 bg-custom-gray' orientation='horizontal' />
      <WrapperMatches />
    </section>
  )
}

export default DatePage
