const WrapperGallery = ({ children }: { children: React.ReactNode }) => {
  return (
    <ol className='grid grid-cols-6 md:grid-cols-5 gap-1 bg-custom-darkblue p-3 rounded-xl'>
      {children}
    </ol>
  )
}

export default WrapperGallery
