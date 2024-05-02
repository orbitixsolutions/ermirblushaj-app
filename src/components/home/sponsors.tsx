import { Avatar } from '@nextui-org/react'

const Sponsors = () => {
  return (
    <section className='w-full bg-custom-green py-8 md:py-24'>
      <ol className='flex gap-3 justify-center'>
        {Array(6)
          .fill(6)
          .map((_, index) => (
            <li key={index}>
              <Avatar />
            </li>
          ))}
      </ol>
    </section>
  )
}

export default Sponsors
