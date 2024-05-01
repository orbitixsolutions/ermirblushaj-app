import WrapperAuth from '@/components/dashboard/admin/wrappers/wrapper-auth'
import NavigationMenu from '@/components/dashboard/navigation/navigation-menu'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-2 md:p-8 max-w-[1440px] mx-auto text-custom-white'>
      <NavigationMenu />
      <WrapperAuth>{children}</WrapperAuth>
    </main>
  )
}

export default Layout
