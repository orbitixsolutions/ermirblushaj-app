import WrapperAuth from '@/components/admin/wrappers/wrapper-auth'
import NavigationMenu from '@/components/navigation/navigation-menu'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-8 w-full min-h-screen h-full text-custom-white bg-custom-navy'>
      <NavigationMenu />
      <WrapperAuth>{children}</WrapperAuth>
    </main>
  )
}

export default Layout
