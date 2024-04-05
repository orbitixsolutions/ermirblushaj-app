import { useIsActive } from '@/store/use-active'
import { Match, Team } from '@prisma/client'
import ImagesMatches from '@/components/dates/image/images-matches'
import FormDateMatches from '@/components/dates/form/form-date-matches'
import ButtonDateMatchup from '@/components/dates/buttons/button-date-matchup'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const CardMatchup = ({ match }: { match: ExtendedMatch }) => {
  const { isActive, activeId } = useIsActive((state) => ({
    isActive: state.isActive,
    activeId: state.id
  }))

  const { id } = match
  const isSameId = activeId === id

  return (
    <>
      <ImagesMatches match={match} />

      {isActive && isSameId ? (
        <FormDateMatches match={match} />
      ) : (
        <ButtonDateMatchup match={match} />
      )}
    </>
  )
}

export default CardMatchup
