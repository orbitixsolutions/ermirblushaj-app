'use client'

import { Grid } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='col-span-12 lg:col-span-4 size-full grid place-items-center'>
      <Grid
        height='175'
        width='175'
        color='#9FC131'
        ariaLabel='grid-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  )
}

export default Loader
