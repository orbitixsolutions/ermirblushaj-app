const WrapperImage = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className='flex w-full gap-3'>
      <div className={`flex flex-col gap-3 my-5 ${className}`}>{children}</div>
    </div>
  )
}

export default WrapperImage
