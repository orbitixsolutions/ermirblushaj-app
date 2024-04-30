import GroupTeams from '@/components/dates/list/group-teams'
import MatchesKeys from '@/components/dates/list/matches/matches-keys'
import BestTeams from '@/components/dates/list/best-teams'
import DateTeams from '@/components/dates/list/date-teams'

const DatePage = () => {
  return (
    <section className='w-full py-8 md:py-20 space-y-8 md:space-y-20'>
      <GroupTeams />
      <MatchesKeys />
      <BestTeams />
      <DateTeams />
    </section>
  )
}

export default DatePage
