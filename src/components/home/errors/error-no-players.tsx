import { Card, ModalBody } from '@nextui-org/react'
import { IconAlertCircle } from '@tabler/icons-react'

interface Props {
  no_players: string
}

const ErrorNoPlayers = ({ content }: { content: Props }) => {
  return (
    <div className='w-full h-full'>
      <Card
        className='w-full h-full grid place-items-center border-2 py-4 border-custom-red
        bg-custom-red/30 text-custom-red/75 text-lg md:text-2xl font-bold '
      >
        <ModalBody className='px-8'>
          <div className='space-y-2'>
            <IconAlertCircle className='text-center w-full' size={80} />
            <p className='text-center'>{content.no_players}</p>
          </div>
        </ModalBody>
      </Card>
    </div>
  )
}

export default ErrorNoPlayers
