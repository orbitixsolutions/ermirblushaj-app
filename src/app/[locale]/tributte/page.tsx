import Footer from '@/components/home/footer'
import Header from '@/components/home/header/header'
import Gallery from '@/components/tributte/gallery'
import Main from '@/components/tributte/main'

const TributePage = () => {
  return (
    <>
      <Header />
      <main>
        <Main />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default TributePage
