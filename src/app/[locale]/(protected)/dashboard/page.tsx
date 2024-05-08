import WrapperSection from '@/components/dashboard/admin/wrappers/wrapper-section'
import GroupsResume from '@/components/dashboard/home/list/groups-resumen'

const DashboardPage = async () => {
  return (
    <WrapperSection>
      <GroupsResume />
    </WrapperSection>
  )
}

export default DashboardPage
