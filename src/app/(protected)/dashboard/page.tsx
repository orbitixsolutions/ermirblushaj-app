import GroupsResume from '@/components/home/list/groups-resumen'

const DashboardPage = async () => {
  return (
    <section className='container mx-auto py-20'>
      <h2 className='text-4xl text-center font-bold'>State groups</h2>
      <GroupsResume />
    </section>
  )
}

export default DashboardPage
