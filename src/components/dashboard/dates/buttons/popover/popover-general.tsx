import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import { IconArrowsSort, IconCheck, IconPlus } from '@tabler/icons-react'
import { useCreateKeys } from '@/hooks/dates-hooks/buttons/create/use-create-keys'
import { useFinishGroups } from '@/hooks/dates-hooks/buttons/options/use-finish-groups'
import { useCurrentRole } from '@/hooks/auth/use-current-role'
import useCreateGroups from '@/hooks/dates-hooks/buttons/create/use-create-groups'
import useCreateMatches from '@/hooks/dates-hooks/buttons/create/use-create-matches'

const DropdownGeneral = () => {
  const role = useCurrentRole()

  const { fullGroups, isPendingGroups, handleCreateGroups } = useCreateGroups()
  const { emptyGroups, fullMatches, isPendingMatches, handleCreateMatches } =
    useCreateMatches()
  const { completedMatches, isPendingFinish, handleFinishGroups } =
    useFinishGroups()
  const { fullMatchesKeys, isPendingKeys, handleCreateKeys } = useCreateKeys()

  return (
    <Popover
      backdrop='opaque'
      placement='bottom'
      className='w-full max-w-[440px]'
    >
      <PopoverTrigger>
        <Button
          color='primary'
          className={`bg-custom-blue text-custom-white ${
            role !== 'OWNER' ? 'col-span-4' : 'col-span-2'
          }`}
        >
          General Options
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-custom-darkblue p-4'>
        <div className='w-full text-custom-white space-y-4'>
          <h3 className='text-center text-xl font-bold'>Options</h3>
          <Button
            fullWidth
            color='primary'
            isDisabled={fullGroups}
            isLoading={isPendingGroups}
            className='bg-custom-blue font-bold'
            startContent={<IconArrowsSort size={20} />}
            onPress={() => handleCreateGroups()}
          >
            Sort Teams
          </Button>

          <Button
            fullWidth
            color='primary'
            isDisabled={fullMatches || emptyGroups}
            isLoading={isPendingMatches}
            className='bg-custom-blue font-bold'
            startContent={<IconPlus size={20} />}
            onPress={() => handleCreateMatches()}
          >
            Generate Dates
          </Button>

          {!completedMatches ? (
            <Button
              fullWidth
              color='primary'
              isLoading={isPendingFinish}
              isDisabled={!fullMatches}
              className='bg-custom-blue font-bold'
              startContent={<IconCheck size={20} />}
              onPress={() => handleFinishGroups()}
            >
              Finish Stage
            </Button>
          ) : (
            <Button
              fullWidth
              color='primary'
              isLoading={isPendingKeys}
              isDisabled={!fullMatches || fullMatchesKeys}
              className='bg-custom-blue font-bold'
              startContent={<IconCheck size={20} />}
              onPress={() => handleCreateKeys()}
            >
              Create Keys
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownGeneral
