import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const ErrorMatchesKyes = () => {
  const content = useTranslations('Keys')

  return (
    <section className='w-full max-w-[700px] mx-auto'>
      <Card className='bg-custom-darkblue rounded-none sm:rounded-xl'>
        <CardHeader>
          <h2 className='w-full text-center text-lg md:text-2xl font-bold text-custom-red'>
            {content('error_title')}
          </h2>
        </CardHeader>
        <CardBody>
          <p className='text-sm md:text-lg text-custom-white/75 text-center text-pretty'>
            {content('error_description')}
          </p>
        </CardBody>
      </Card>
    </section>
  )
}

export default ErrorMatchesKyes
