import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Tooltip
} from '@nextui-org/react'
import { useCurrentRole } from '@/hooks/auth/use-current-role'
import { IconTrash, IconRestore } from '@tabler/icons-react'
import useDeleteGroups from '@/hooks/dates-hooks/buttons/delete/use-delete-groups'
import useDeleteMatches from '@/hooks/dates-hooks/buttons/delete/use-delete-matches'
import useResetStats from '@/hooks/dates-hooks/buttons/delete/use-reset-stats'

const DropdownAdmin = () => {
  const role = useCurrentRole()

  const { emptyGroups, isPendingGroups, handleDeleteGroups } = useDeleteGroups()
  const { emptyMatches, isPendingMatches, handleDeleteMatches } =
    useDeleteMatches()
  const { isPendingStats, handleResetStats } = useResetStats()

  if (role !== 'OWNER') return null

  return (
    <Popover placement='bottom' className='w-full max-w-[440px]'>
      <PopoverTrigger>
        <Button
          color='danger'
          className='bg-custom-red text-custom-white col-span-2'
        >
          Admin Options
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-custom-darkblue p-4'>
        <div className='w-full text-custom-white space-y-4'>
          <h3 className='text-center text-xl font-bold'>Options</h3>
          <Tooltip
            placement='bottom'
            className='w-80 text-custom-white bg-custom-navy p-5'
            content={
              <div className='space-y-2 text-center'>
                <h3 className='text-xl xl:text-2xl font-bold'>Delete Groups</h3>
                <div>
                  <p>
                    This{' '}
                    <span className='text-custom-red underline'>action</span>{' '}
                    cannot be undone!
                  </p>
                </div>
              </div>
            }
          >
            <Button
              fullWidth
              color='danger'
              isDisabled={emptyGroups}
              isLoading={isPendingGroups}
              className='bg-custom-red font-bold'
              startContent={<IconTrash size={20} />}
              onPress={() => handleDeleteGroups()}
            >
              Delete Groups
            </Button>
          </Tooltip>

          <Tooltip
            placement='bottom'
            className='w-80 text-custom-white bg-custom-navy p-5'
            content={
              <div className='space-y-2 text-center'>
                <h3 className='text-xl xl:text-2xl font-bold'>
                  Delete Matches
                </h3>
                <div>
                  <p>
                    This{' '}
                    <span className='text-custom-red underline'>action</span>{' '}
                    cannot be undone!
                  </p>
                </div>
              </div>
            }
          >
            <Button
              fullWidth
              color='danger'
              isDisabled={emptyMatches}
              isLoading={isPendingMatches}
              className='bg-custom-red font-bold'
              startContent={<IconTrash size={20} />}
              onPress={() => handleDeleteMatches()}
            >
              Delete Matches
            </Button>
          </Tooltip>

          <Tooltip
            placement='bottom'
            className='w-80 text-custom-white bg-custom-navy p-5'
            content={
              <div className='space-y-2 text-center'>
                <h3 className='text-xl xl:text-2xl font-bold'>Reset Stats</h3>
                <div>
                  <p>
                    This{' '}
                    <span className='text-custom-red underline'>action</span>{' '}
                    cannot be undone!
                  </p>
                </div>
              </div>
            }
          >
            <Button
              fullWidth
              color='danger'
              isLoading={isPendingStats}
              className='bg-custom-red font-bold'
              startContent={<IconRestore size={20} />}
              onPress={() => handleResetStats()}
            >
              Reset Stats
            </Button>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownAdmin
