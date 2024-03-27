import { Divider } from '@nextui-org/divider'
import WrapperSection from '@/components/new/wrappers/wrapper-section'
import ButtonModalPlayer from '@/components/new/buttons/players/button-modal-player'
import ButtonModalTeam from '@/components/new/buttons/teams/button-modal-team'
import Players from '@/components/new/lists/player/players'
import Teams from '@/components/new/lists/team/teams'
import ModalPlayer from '@/components/new/modals/players/modal-player'
import ModalTeam from '@/components/new/modals/teams/modal-team'

const NewPage = () => {
  return (
    <>
      <WrapperSection>
        <div className='col-span-5'>
          <div className='w-full flex justify-center items-center gap-4'>
            <h2 className='text-2xl font-bold uppercase'>Add team</h2>
            <ButtonModalTeam />
          </div>
          <Divider
            className='bg-gradient-to-r from-transparent via-custom-white to-transparent my-8'
            orientation='horizontal'
          />
          <Teams />
        </div>
        <Divider className='bg-custom-gray mx-auto' orientation='vertical' />
        <div className='col-span-5'>
          <div className='w-full flex justify-center items-center gap-4'>
            <h2 className='text-2xl font-bold uppercase'>Add player</h2>
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
