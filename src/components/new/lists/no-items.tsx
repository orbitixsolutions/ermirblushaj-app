import WrapperNew from '@/components/new/wrappers/wrapper-new'

const NoItems = () => {
  return (
    <WrapperNew>
      <p className='col-span-8 text-sm md:text-xl py-8 text-center font-bold'>
        No there teams/players available.
      </p>
    </WrapperNew>
  )
}

export default NoItems
