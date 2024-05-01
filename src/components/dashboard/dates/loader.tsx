'use client'
import { Bars } from 'react-loader-spinner'

const Loader = () => {
  return (
    <section className='grid place-items-center'>
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

export default Loader
