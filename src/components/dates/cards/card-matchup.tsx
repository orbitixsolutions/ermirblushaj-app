import { useIsActive } from '@/store/use-active'
import { Match, Team } from '@prisma/client'
import ImagesMatches from '@/components/dates/image/images-matches'
import FormDateMatches from '@/components/dates/form/form-date-matches'
import ButtonDateMatchup from '@/components/dates/buttons/button-date-matchup'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const CardMatchup = ({ item }: { item: ExtendedMatch }) => {
  const { isActive, activeId } = useIsActive((state) => ({
    isActive: state.isActive,
    activeId: state.id
  }))

  const { id } = item

  return (
    <li>
      <div className='bg-custom-darknavy rounded-lg grid grid-cols-4 gap-4 p-4'>
        <ImagesMatches item={item} />

        {isActive && activeId === id ? (
          <FormDateMatches item={item} />
        ) : (
          <ButtonDateMatchup item={item} />
        )}
      </div>
    </li>
  )
}

export default CardMatchup
