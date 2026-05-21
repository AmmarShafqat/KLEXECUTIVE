import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FleetSection from '@/components/sections/FleetSection'
import CitiesSection from '@/components/sections/CitiesSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AboutSection from '@/components/sections/AboutSection'
import CTABannerSection from '@/components/sections/CTABannerSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <FleetSection />
        <CitiesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <AboutSection />
        <CTABannerSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
