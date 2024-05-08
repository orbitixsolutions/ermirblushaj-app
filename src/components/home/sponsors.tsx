import { Image, Tooltip } from '@nextui-org/react'
import { sponsors } from './data'

const Sponsors = () => {
  return (
    <section className='w-full bg-custom-green py-10'>
      <ol className='flex flex-wrap gap-8 items-center justify-center'>
        {sponsors.map((sponsor, index) => (
          <li key={index}>
            <Tooltip content={<p>{sponsor.name}</p>}>
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                radius='none'
                className='w-[100px] md:w-[150px] object-cover'
              />
            </Tooltip>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Sponsors
