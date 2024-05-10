'use client'

import DropdownGeneral from './popover/popover-general'
import DropdownAdmin from './popover/popover-admin'

const GeneralButtons = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-4'>
      <DropdownGeneral />
      <DropdownAdmin />
    </div>
  )
}

export default GeneralButtons
