const WrapperSection = ({ children }: { children: React.ReactNode }) => {
    return (
      <section className='w-full py-24'>
        <div className='w-full mx-auto container grid grid-cols-11'>
          {children}
        </div>
      </section>
    )
  }
  
  export default WrapperSection
  