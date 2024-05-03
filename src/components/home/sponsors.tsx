import { Avatar } from '@nextui-org/react'

const Sponsors = () => {
  return (
    <section className='w-full bg-custom-green py-10'>
      <ol className='flex gap-2 md:gap-12 justify-center'>
        {Array(6)
          .fill(6)
          .map((_, index) => (
            <li key={index}>
              <Avatar size='sm' />
            </li>
          ))}
      </ol>
    </section>
  )
}

export default Sponsors
