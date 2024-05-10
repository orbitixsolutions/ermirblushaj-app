import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Tooltip
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
    <Popover placement='bottom' className='w-[440px]'>
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
          <Tooltip
            placement='bottom'
            className='w-80 text-custom-white bg-custom-navy p-5'
            content={
              <div className='space-y-2 text-center'>
                <h3 className='text-xl xl:text-2xl font-bold'>Groups Fase</h3>
                <div>
                  <p>Automatically organize groups</p>
                  <p>with the push of a button.</p>
                </div>
              </div>
            }
          >
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
          </Tooltip>

          <Tooltip
            placement='bottom'
            className='w-80 text-custom-white bg-custom-navy p-5'
            content={
              <div className='space-y-2 text-center'>
                <h3 className=' text-xl xl:text-2xl font-bold'>
                  Generate Dates
                </h3>
                <div>
                  <p>Create matches in an organized way</p>
                  <p>in a simple way.</p>
                </div>
              </div>
            }
          >
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
          </Tooltip>

          {!completedMatches ? (
            <Tooltip
              placement='bottom'
              className='w-80 text-custom-white bg-custom-navy p-5'
              content={
                <div className='space-y-2 text-center'>
                  <h3 className='text-xl xl:text-2xl font-bold'>
                    Finish Stage
                  </h3>
                  <div>
                    <p>This will end the group</p>
                    <p>with the push of a button.</p>
                  </div>
                </div>
              }
            >
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
            </Tooltip>
          ) : (
            <Tooltip
              placement='bottom'
              className='w-80 text-custom-white bg-custom-navy p-5'
              content={
                <div className='space-y-2 text-center'>
                  <h3 className='text-xl xl:text-2xl font-bold'>
                    Generate Key
                  </h3>
                  <div>
                    <p>Generates keys in an organized way</p>
                    <p>in a simple way (the dates of</p>
                    <p>calendar can be manual)</p>
                  </div>
                </div>
              }
            >
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
            </Tooltip>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DropdownGeneral
