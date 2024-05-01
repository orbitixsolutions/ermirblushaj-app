import { Divider } from '@nextui-org/divider'
import ListTournamentGallery from '@/components/dashboard/gallery/lists/tournament/tournament-gallery'
import ButtonAddImageTournament from '@/components/dashboard/gallery/buttons/tournament/button-add-image-tournament'
import ButtonAddImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-add-image-tribute'
import ListTributeGallery from '@/components/dashboard/gallery/lists/tribute/tribute-gallery'
import WrapperSection from '@/components/dashboard/gallery/wrappers/wrapper-section'

const GalleryPage = () => {
  return (
    <WrapperSection>
      <div className='col-span-11 lg:col-span-5'>
        <article className='w-full flex justify-center items-center gap-4'>
          <h2 className='text-2xl font-bold uppercase'>Gallery (Tournament)</h2>
        </article>
        <div className='w-full mt-8 mb-4'>
          <ButtonAddImageTournament />
        </div>
        <ListTournamentGallery />
      </div>
      <Divider className='bg-custom-gray mx-auto hidden lg:block' orientation='vertical' />
      <div className='col-span-11 lg:col-span-5'>
        <article className='w-full flex justify-center items-center gap-4'>
          <h2 className='text-2xl font-bold uppercase'>Gallery (tribute)</h2>
        </article>
        <div className='w-full mt-8 mb-4'>
          <ButtonAddImageTribute />
        </div>
        <ListTributeGallery />
      </div>
    </WrapperSection>
  )
}

export default GalleryPage
