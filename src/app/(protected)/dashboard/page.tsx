import WrapperSection from '@/components/dashboard/admin/wrappers/wrapper-section'
import GroupsResume from '@/components/dashboard/home/list/groups-resumen'

const DashboardPage = async () => {
  return (
    <WrapperSection>
      <h2 className='text-2xl col-span-11 md:text-4xl text-center font-bold mt-5'>State groups</h2>
      <GroupsResume />
    </WrapperSection>
  )
}

export default DashboardPage
