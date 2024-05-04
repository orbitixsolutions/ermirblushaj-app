import Dates from '@/components/home/dates'
import Footer from '@/components/home/footer'
import Guide from '@/components/home/guide'
import Header from '@/components/home/header'
import Main from '@/components/home/main'
import Sponsors from '@/components/home/sponsors'
import TablesGroup from '@/components/home/tables'
import Teams from '@/components/home/teams'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Main />
        <Sponsors />
        <Guide />
        <Dates />
        <TablesGroup />
        <Teams />
      </main>
      <Footer />
    </>
  )
}
