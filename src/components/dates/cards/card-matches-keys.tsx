import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '../image/images-matches-keys'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const CardMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  return <ImagesMatchesKeys match={match} />
}

export default CardMatchesKeys
