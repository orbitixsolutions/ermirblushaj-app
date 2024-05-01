const WrapperSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full py-5 md:py-24'>
      <div className='w-full mx-auto container grid grid-cols-11 space-y-8 lg:space-y-0'>
        {children}
      </div>
    </section>
  )
}

export default WrapperSection
