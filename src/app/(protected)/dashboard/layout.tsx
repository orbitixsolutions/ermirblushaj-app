import WrapperAuth from '@/components/admin/wrappers/wrapper-auth'
import NavigationMenu from '@/components/navigation/navigation-menu'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-2 md:p-8 text-custom-white'>
      <NavigationMenu />
      <WrapperAuth>{children}</WrapperAuth>
    </main>
  )
}

export default Layout
