import { Avatar, Button } from '@nextui-org/react'

const Guide = () => {
  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-16 px-5 flex flex-wrap text-custom-white'>
      <h2 className='text-xl md:text-2xl w-full font-bold text-center mb-8'>
        How the tournament works?
      </h2>
      <div className='space-y-12 md:space-y-0 w-full gap-x-16 lg:gap-8 flex flex-wrap justify-center lg:justify-between items-center'>
        <div className='space-y-4 max-w-[300px]'>
          <Avatar className='mx-auto' />
          <h2 className='text-sm md:text-xl text-center font-bold'>Keys</h2>
          <p className='text-center text-pretty text-xs md:text-lg'>
            In questa sezione sono presentate le fasi del torneo, iniziando
            dalla fase a gironi fino agli scontri diretti. Qui puoi seguire il
            progresso delle squadre e vedere chi avanza ai turni successivi.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See keys
            </Button>
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar className='mx-auto' />

          <h2 className='text-sm md:text-xl text-center font-bold'>Teams</h2>
          <p className='text-center text-pretty text-xs md:text-lg'>
            Scopri le squadre partecipanti al torneo. Ogni squadra è composta da
            giocatori locali che rappresentano le loro comunità, dimostrando
            talento e passione per il calcio.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See teams
            </Button>
          </div>
        </div>

        <div className='space-y-4 max-w-[300px]'>
          <Avatar className='mx-auto' />
          <h2 className='text-sm md:text-xl text-center font-bold'>Dates</h2>
          <p className='text-center text-pretty text-xs md:text-lg'>
            Consulta il calendario del torneo per non perderti nessuna partita.
            Le partite sono programmate su diverse settimane, culminando in
            un'emozionante finale.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See dates
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
