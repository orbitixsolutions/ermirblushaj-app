import { dataMatchesKeys } from '@/actions/services/data'
import { getTranslations } from 'next-intl/server'
import NavBar from '@/components/home/header/navbar'

const Header = async () => {
  const matchKeys = await dataMatchesKeys()

  const content = await getTranslations('Header')

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
      <NavBar
        matchKeys={matchKeys}
        contentItems={contentItems}
        contentDashboard={contentDashboard}
      />
    </header>
  )
}

export default Header
