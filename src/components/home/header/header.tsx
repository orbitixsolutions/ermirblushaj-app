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

  return (
    <header>
      <NavBar contentItems={contentItems} />
    </header>
  )
}

export default Header
