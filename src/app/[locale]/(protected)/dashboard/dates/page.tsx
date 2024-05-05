import GroupTeams from '@/components/dashboard/dates/list/group-teams'
import MatchesKeys from '@/components/dashboard/dates/list/matches/matches-keys'
import BestTeams from '@/components/dashboard/dates/list/best-teams'
import DateTeams from '@/components/dashboard/dates/list/date-teams'

const DatePage = () => {
  return (
    <section className='py-8 md:py-20 space-y-8 md:space-y-20'>
      <GroupTeams />
      <MatchesKeys />
      <BestTeams />
      <DateTeams />
    </section>
  )
}

export default DatePage
