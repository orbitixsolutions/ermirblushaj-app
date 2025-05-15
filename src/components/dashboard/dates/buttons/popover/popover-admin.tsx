import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import { useCurrentRole } from '@/hooks/auth/use-current-role'
import { IconTrash, IconRestore } from '@tabler/icons-react'
import useDeleteGroups from '@/hooks/dates-hooks/buttons/delete/use-delete-groups'
import useDeleteMatches from '@/hooks/dates-hooks/buttons/delete/use-delete-matches'
import useResetStats from '@/hooks/dates-hooks/buttons/delete/use-reset-stats'
import useResetDates from '@/hooks/dates-hooks/buttons/delete/use-reset-dates'

const DropdownAdmin = () => {
  const role = useCurrentRole()

  const { emptyGroups, isPendingGroups, handleDeleteGroups } = useDeleteGroups()
  const { emptyMatches, isPendingMatches, handleDeleteMatches } =
    useDeleteMatches()
  const { isPendingStats, handleResetStats } = useResetStats()

  const { isPendingDates, handleResetDates } = useResetDates()

  if (role !== 'OWNER') return null

  return (
    <Popover
      backdrop='opaque'
      placement='bottom'
      className='w-full max-w-[440px]'
    >
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

          <Button
            fullWidth
            color='danger'
            isLoading={isPendingDates}
            className='bg-custom-red font-bold'
            startContent={<IconRestore size={20} />}
            onPress={() => handleResetDates()}
          >
            Reset Dates
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownAdmin
