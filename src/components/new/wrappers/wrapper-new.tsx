const WrapperNew = ({ children }: { children: React.ReactNode }) => {
    return (
      <ol className='grid grid-cols-5 gap-4 bg-custom-darkblue px-6 py-4 rounded-xl'>
        {children}
      </ol>
    )
  }
  
  export default WrapperNew
  