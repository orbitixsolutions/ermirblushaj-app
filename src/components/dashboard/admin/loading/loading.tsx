'use client'
import { Bars } from 'react-loader-spinner'

const Loading = () => {
  return (
    <section className='top-0 left-0 z-[25] fixed bg-custom-navy w-full h-full min-h-screen grid place-items-center'>
      <Bars
        height='256'
        width='256'
        color='#9FC131'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </section>
  )
}

export default Loading
