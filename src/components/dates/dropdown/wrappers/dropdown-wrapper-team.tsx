import {
  Card,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image
} from '@nextui-org/react'

interface Props {
  name: string
  src: string | null
  render: JSX.Element
  id: string
}

const DropdownWrapper = ({ render, name, src }: Props) => {
  return (
    <Dropdown className='bg-custom-darknavy text-white'>
      <DropdownTrigger>
        <Card className='aspect-square p-4 cursor-pointer bg-custom-navy'>
          <Image
            className='size-full object-cover'
            src={src || ''}
            alt={`Logo team ${name}`}
          />
        </Card>
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
