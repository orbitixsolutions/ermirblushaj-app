import GroupsResume from '@/components/home/list/groups-resumen'

const DashboardPage = async () => {
  return (
    <section>
      <h2 className='text-2xl md:text-4xl text-center font-bold mt-5'>State groups</h2>
      <GroupsResume />
    </section>
  )
}

export default DashboardPage
