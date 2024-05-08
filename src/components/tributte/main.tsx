import { BallBrand, ManPoseBrand } from '@/assets/images'
import { Image } from '@nextui-org/react'

const Main = () => {
  return (
    <section className='flex max-w-[1024px] mx-auto py-8 md:py-24 px-5 justify-center lg:justify-between flex-wrap space-y-16 md:space-y-0'>
      <div className='max-w-[620px] relative w-[400px]'>
        <h2 className='text-lg md:text-4xl lg:text-5xl font-bold text-center md:text-start text-custom-green'>
          Ermir Blushaj
        </h2>
        <p className='max-w-[400px] mt-4 text-xs md:text-lg text-custom-white text-center md:text-start text-pretty'>
          Ermir Bujash ha lasciato un segno indelebile nei cuori di coloro che
          lo hanno conosciuto. La sua gioia e il suo amore per la vita erano
          contagiosi, e la sua capacità di illuminare una stanza con il suo
          sorriso non sarà mai dimenticata. Ermir non si è limitato a vivere; ha
          ispirato tutti a vivere pienamente e con passione. Ricorderemo sempre
          il suo coraggio, la sua gentilezza e il suo spirito indomito, che
          continua a insegnarci l'importanza di apprezzare ogni momento.
        </p>
      </div>

      <div className='relative w-[400px] h-[300px]'>
        <div className='absolute w-[64px] h-[64px] top-0 left-0'>
          <Image src={BallBrand.src} alt='Ermir Blushaj' />
        </div>
        <div className='absolute w-[315px] h-[230px] top-20 right-[50%] translate-x-[50%]'>
          <Image src={ManPoseBrand.src} alt='Ermir Blushaj' />
        </div>
      </div>
    </section>
  )
}

export default Main
