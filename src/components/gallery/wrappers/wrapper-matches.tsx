'use client'

import BestTeams from '@/components/dates/list/best-teams'
import MatchesKeys from '@/components/dates/list/matches/matches-keys'
import DateTeams from '@/components/dates/list/date-teams'

const WrapperMatches = () => {
  return (
    <div className='space-y-16'>
      <MatchesKeys />
      <BestTeams />
      <DateTeams />
    </div>
  )
}
export default WrapperMatches
