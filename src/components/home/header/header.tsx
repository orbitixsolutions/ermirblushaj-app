import { useTranslations } from 'next-intl'
import NavBar from '@/components/home/header/navbar'

const Header = () => {
  const content = useTranslations('Header')

  const contentItems = {
    keys: content('navigation.keys'),
    teams: content('navigation.teams'),
    dates: content('navigation.date'),
    tables: content('navigation.positions'),
    tribute: content('navigation.tribute')
  }

  const contentDashboard = {
    title: content('dashboard.title'),
    dashboard: content('dashboard.dashboard_item'),
    logout: content('dashboard.logout_item')
  }

  return (
    <header>
      <NavBar contentItems={contentItems} contentDashboard={contentDashboard} />
    </header>
  )
}

export default Header
