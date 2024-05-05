import { currentRole } from '@/libs/auth'
import { Divider } from '@nextui-org/react'
import { redirect } from 'next/navigation'
import TableAdmin from '@/components/dashboard/admin/table/table-admin'
import WrapperSection from '@/components/dashboard/admin/wrappers/wrapper-section'
import FormAdmin from '@/components/dashboard/admin/form/form-admin'

const AdminPage = async () => {
  const role = await currentRole()

  if (role === 'OWNER') {
    return (
      <WrapperSection>
        <div className='col-span-11 lg:col-span-5'>
          <h2 className='text-2xl font-bold mb-5 uppercase'>Admin users</h2>
          <TableAdmin />
        </div>
        <Divider
          className='col-span-1 hidden lg:block bg-custom-gray mx-auto'
          orientation='vertical'
        /> 
        <div className='col-span-11 lg:col-span-5'>
          <h2 className='text-2xl font-bold mb-5 uppercase'>Create admin</h2>
          <FormAdmin />
        </div>
      </WrapperSection>
    )
  }

  return redirect('/dashboard')
}

export default AdminPage
