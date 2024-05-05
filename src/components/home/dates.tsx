import BestGoals from '@/components/home/dates/best-goals'
import Matches from '@/components/home/dates/matches'
import Gallery from '@/components/home/dates/gallery'
import { useTranslations } from 'next-intl'

const Dates = () => {
  const t = useTranslations('Dates')

  return (
    <section className='max-w-[1024px] md:max-w-[1536px] mx-auto py-8 md:py-16 px-5 sm:px-16 md:px-20 lg:px-5 text-custom-white space-y-8 md:space-y-0 grid grid-cols-12 gap-4 md:gap-8 xl:gap-20 justify-between'>
      <Gallery t={t} />
      <Matches />
      <BestGoals t={t} />
    </section>
  )
}

export default Dates
