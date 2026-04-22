import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Features from '@/components/sections/Features'
import DemoBento from '@/components/sections/DemoBento'
import SSTSection from '@/components/sections/SSTSection'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import CTAForm from '@/components/sections/CTAForm'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <Features />
        <DemoBento />
        <SSTSection />
        <Testimonials />
        <Pricing />
        <CTAForm />
      </main>
      <Footer />
    </>
  )
}
