import GroupTeams from '@/components/dashboard/dates/list/group-teams'
import MatchesKeys from '@/components/dashboard/dates/list/matches/matches-keys'
import TopTeams from '@/components/dashboard/dates/list/top-teams'
import DateTeams from '@/components/dashboard/dates/list/date-teams'
import GeneralButtons from '@/components/dashboard/dates/buttons/general-buttons'

const DatePage = () => {
  return (
    <section className='py-8 md:py-20 space-y-8 md:space-y-20'>
      <GeneralButtons />
      <GroupTeams />
      <MatchesKeys />
      <TopTeams />
      <DateTeams />
    </section>
  )
}

export default DatePage
