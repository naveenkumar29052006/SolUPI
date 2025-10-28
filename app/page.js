import dynamic from 'next/dynamic';
import { SolUPINavBar } from '../components/ui/navbar-demo';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import SectionSkeleton from '../components/ui/SectionSkeleton';

// Code-split heavier client sections for smoother interaction
const Features = dynamic(() => import('../components/Features'), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import('../components/HowItWorks'), {
  loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import('../components/FAQ'), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import('../components/Testimonials'), {
  loading: () => <SectionSkeleton />,
});
const Comparison = dynamic(() => import('../components/Comparison'), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  console.log('Home component rendering...');
  return (
    <div className="min-h-screen relative z-10">
      <SolUPINavBar />
      <main className="relative pt-32 sm:pt-40 z-10">
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
          <Comparison />
        </section>
        <section>
          <Testimonials />
        </section>
        <section>
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
}
