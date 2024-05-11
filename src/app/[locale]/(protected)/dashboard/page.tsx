import { Divider } from '@nextui-org/react'
import { currentUser } from '@/libs/auth'
import { redirect } from 'next/navigation'
import GroupsResume from '@/components/dashboard/home/list/groups-resumen'

const DashboardPage = async () => {
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }

  return (
    <section className='w-full py-8 md:py-24 mx-auto container space-y-16'>
      <h1 className=' text-xl md:text-5xl font-bold text-center'>
        Welcome back! <span className='text-custom-green'>{user.name}</span>
      </h1>
      <Divider orientation='horizontal' className='bg-custom-lightgray' />
      <GroupsResume />
    </section>
  )
}

export default DashboardPage
