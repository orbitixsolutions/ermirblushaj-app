import { Card, CardBody } from '@nextui-org/react'
import WrapperNew from '@/components/dashboard/new/wrappers/wrapper-new'

const CardError = ({ message }: { message: string }) => {
  return (
    <WrapperNew>
      <Card className='bg-custom-red/30 p-8 col-span-5 border-2 border-custom-red'>
        <CardBody>
          <h3 className='text-center text-2xl text-custom-red/75'>{message}</h3>
        </CardBody>
      </Card>
    </WrapperNew>
  )
}

export default CardError
