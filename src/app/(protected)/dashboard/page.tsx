import { currentUser } from '@/libs/auth'

const DashboardPage = async () => {
  const user = await currentUser()

  return (
    <div>
      <h1>Dashboard page</h1>
      {JSON.stringify(user)}
    </div>
  )
}

export default DashboardPage
