import { useIsActive } from '@/store/use-active'
import { Match, Team } from '@prisma/client'
import ImagesMatches from '@/components/dashboard/dates/image/images-matches'
import FormDateMatches from '@/components/dashboard/dates/form/form-date-matches'
import ButtonDateMatchup from '@/components/dashboard/dates/buttons/button-date-matchup'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const CardMatchup = ({ match }: { match: ExtendedMatch }) => {
  const isOpen = useIsActive((state) => state.id)
  const { id, status } = match

  const isPending = status === 'PENDING'
  const isLive = status === 'LIVE'
  const isSameId = isOpen === id

  return (
    <>
      <ImagesMatches match={match} />
      {(isPending && isSameId) || (isLive && isSameId) ? (
        <FormDateMatches match={match} />
      ) : (
        <ButtonDateMatchup match={match} />
      )}
    </>
  )
}

export default CardMatchup
