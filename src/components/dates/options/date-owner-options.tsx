import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useCurrentRole } from '@/hooks/auth/use-current-role'
import ButtonDeleteGroups from '@/components/dates/buttons/options/button-delete-groups'
import ButtonDeleteMatches from '@/components/dates/buttons/options/button-delete-matches'
import ButtonDeleteStats from '@/components/dates/buttons/options/button-delete-stats'

const DateOwnerOptions = () => {
  const role = useCurrentRole()

  if (role !== 'OWNER') return

  return (
    <>
      <div className='grid gap-5'>
        <Card className='w-[400px] border-2 border-custom-red bg-custom-darkblue text-custom-white'>
          <CardHeader>
            <h3 className='mx-auto text-4xl font-bold'>Delete Groups</h3>
          </CardHeader>
          <CardBody>
            <p className='text-center'>Delete all groups.</p>
            <p className='text-center'>
              This <span className='text-custom-red underline'>action</span>{' '}
              cannot be undone!
            </p>
          </CardBody>
          <CardFooter>
            <ButtonDeleteGroups />
          </CardFooter>
        </Card>

        <Card className='w-[400px] border-2 border-custom-red bg-custom-darkblue text-custom-white'>
          <CardHeader>
            <h3 className='mx-auto text-4xl font-bold'>Delete Matches</h3>
          </CardHeader>
          <CardBody>
            <p className='text-center'>Delete all matches.</p>
            <p className='text-center'>
              This <span className='text-custom-red underline'>action</span>{' '}
              cannot be undone!
            </p>
          </CardBody>
          <CardFooter>
            <ButtonDeleteMatches />
          </CardFooter>
        </Card>

        <Card className='w-[400px] border-2 border-custom-red bg-custom-darkblue text-custom-white'>
          <CardHeader>
            <h3 className='mx-auto text-4xl font-bold'>Reset Stats</h3>
          </CardHeader>
          <CardBody>
            <p className='text-center'>Reset all stats for teams/players.</p>
            <p className='text-center'>
              This <span className='text-custom-red underline'>action</span>{' '}
              cannot be undone!
            </p>
          </CardBody>
          <CardFooter>
            <ButtonDeleteStats />
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default DateOwnerOptions
