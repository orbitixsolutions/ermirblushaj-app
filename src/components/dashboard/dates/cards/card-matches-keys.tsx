import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const CardMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  return <ImagesMatchesKeys match={match} />
}

export default CardMatchesKeys
