import NavbarWithContent from '../components/Navbar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ExpertIntro from '../components/ExpertIntro';
import About from '../components/About';
import VissionMission from '../components/VissionMission';
import Values from '../components/Values';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ExpertIntro />
      <About />
      <VissionMission />
      <Values />
      <Services />
      <WhyChoose />
      <Footer />
    </>
  );
}
