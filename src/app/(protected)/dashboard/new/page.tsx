import { Divider } from '@nextui-org/divider'
import WrapperSection from '@/components/dashboard/new/wrappers/wrapper-section'
import ButtonModalPlayer from '@/components/dashboard/new/buttons/players/button-modal-player'
import ButtonModalTeam from '@/components/dashboard/new/buttons/teams/button-modal-team'
import Players from '@/components/dashboard/new/lists/player/players'
import Teams from '@/components/dashboard/new/lists/team/teams'
import ModalPlayer from '@/components/dashboard/new/modals/players/modal-player'
import ModalTeam from '@/components/dashboard/new/modals/teams/modal-team'
import AlertTournament from '@/components/dashboard/new/alert/alert-tournament'

const NewPage = () => {
  return (
    <>
      <WrapperSection>
        <AlertTournament />

        <div className='col-span-11 lg:col-span-5'>
          <div className='w-full flex justify-center items-center gap-4'>
            <h2 className='text-sm md:text-2xl font-bold uppercase'>
              Add team
            </h2>
            <ButtonModalTeam />
          </div>
          <Divider
            className='bg-gradient-to-r from-transparent via-custom-white to-transparent my-8'
            orientation='horizontal'
          />
          <Teams />
        </div>
        <Divider
          className='bg-custom-gray mx-auto hidden lg:block'
          orientation='vertical'
        />
        <div className='col-span-11 lg:col-span-5'>
          <div className='w-full flex justify-center items-center gap-4'>
            <h2 className='text-sm md:text-2xl font-bold uppercase'>
              Add player
            </h2>
            <ButtonModalPlayer />
          </div>
          <Divider
            className='bg-gradient-to-r from-transparent via-custom-white to-transparent my-8'
            orientation='horizontal'
          />
          <Players />
        </div>
      </WrapperSection>

      <ModalTeam />
      <ModalPlayer />
    </>
  )
}

export default NewPage
