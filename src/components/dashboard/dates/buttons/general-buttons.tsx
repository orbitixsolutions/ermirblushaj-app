'use client'

import DropdownGeneral from './popover/popover-general'
import DropdownAdmin from './popover/popover-admin'

const GeneralButtons = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-4'>
      <h2 className='col-span-4 text-2xl xl:text-5xl font-bold text-center mb-5'>
        Options Dates
      </h2>
      <DropdownGeneral />
      <DropdownAdmin />
    </div>
  )
}

export default GeneralButtons
