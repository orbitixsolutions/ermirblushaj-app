import { Image, Tooltip } from '@nextui-org/react'
import { sponsors } from './data'

const Sponsors = () => {
  return (
    <section className='w-full bg-custom-green py-5'>
      <ol className='flex flex-wrap gap-8 md:gap-16 items-center justify-center'>
        {sponsors.map((sponsor, index) => (
          <li key={index}>
            <Tooltip content={<p>{sponsor.name}</p>}>
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                radius='none'
                className='w-[50px] md:w-[80px] object-cover'
              />
            </Tooltip>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Sponsors
