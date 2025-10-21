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
        <section>
          <Features />
        </section>
        <section>
          <HowItWorks />
        </section>
        <section>
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
}
