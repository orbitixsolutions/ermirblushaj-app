import Footer from '@/components/home/footer'
import Header from '@/components/home/header/header'
import Gallery from '@/components/tribute/gallery'
import Main from '@/components/tribute/main'

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
