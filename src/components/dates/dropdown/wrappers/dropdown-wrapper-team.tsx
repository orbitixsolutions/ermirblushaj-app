import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'

interface Props {
  render: JSX.Element
}

const DropdownWrapper = ({ render }: Props) => {
  return (
    <Dropdown className='bg-custom-darknavy text-white'>
      <DropdownTrigger>
        <Button
          size='sm'
          isIconOnly
          radius='full'
          className='bg-transparent border-2 border-custom-blue rounded-full mx-auto'
        >
          <IconPlus size={24} className='text-custom-blue' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Team player list'>
        <DropdownSection
          classNames={{
            heading: 'text-xl font-bold text-custom-white'
          }}
          title='Players'
          showDivider
        >
          {render}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownWrapper
