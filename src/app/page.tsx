import Hero from '@/components/Hero';
import About from '@/components/About'; 
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
    </main>
  );
}
