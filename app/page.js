import { SolUPINavBar } from '../components/ui/navbar-demo';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  console.log('Home component rendering...');
  return (
    <div className="min-h-screen bg-black relative">
      <SolUPINavBar />
      <main className="relative pt-32 sm:pt-40">
        <section>
          <HeroSection />
        </section>
        <div className="h-32 md:h-48"></div>
        <section>
          <Features />
        </section>
        <div className="h-32 md:h-48"></div>
        <section>
          <HowItWorks />
        </section>
        <div className="h-32 md:h-48"></div>
        <section>
          <FAQ />
        </section>
        <div className="h-32 md:h-48"></div>
      </main>
      <Footer />
    </div>
  );
}
