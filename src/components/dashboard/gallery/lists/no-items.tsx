import WrapperGallery from '@/components/dashboard/gallery/wrappers/wrapper-gallery'

const NoItems = () => {
  return (
    <WrapperGallery>
      <p className='col-span-5 text-xl py-8 text-center font-bold'>
        No there images available.
      </p>
    </WrapperGallery>
  )
}

export default NoItems
