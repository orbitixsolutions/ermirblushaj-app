import { isCurrentDate } from '@/helpers/is-today'
import { isLimitDate } from '@/helpers/limit-date'
import { Card, CardBody } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { IconAlertCircle } from '@tabler/icons-react'

type ExtendedMatchKey = MatchKey & {
    teamKeyA: Team
    teamKeyB: Team
  }

const CardLimitDate = ({ match }: { match: ExtendedMatchKey }) => {
  return (
    <>
      {isCurrentDate(match.playStartDate!) && (
        <Card className='w-full border-2 border-custom-red bg-custom-red/40'>
          <CardBody className='px-4 text-custom-red/80 flex flex-row space-x-2 items-center'>
            <IconAlertCircle />
            <p className='text-lg'>
              Expired Date:{' '}
              <span className='font-bold'>
                {isLimitDate(match.playStartDate!).replaceAll('-', '/')}
              </span>
            </p>
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default CardLimitDate
