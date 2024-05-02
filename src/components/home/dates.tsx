import BestGoals from '@/components/home/dates/best-goals'
import Matches from '@/components/home/dates/matches'
import Gallery from '@/components/home/dates/gallery'

const Dates = () => {
  return (
    <section className='max-w-[1440px] mx-auto py-8 md:py-24 px-5 flex flex-wrap justify-center text-custom-white space-y-8'>
      <Gallery />
      <Matches />
      <BestGoals />
    </section>
  )
}

export default Dates
