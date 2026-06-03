import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Architecture from "@/components/Architecture";
import Certifications from "@/components/Certifications";
import ClientBackground from "@/components/ClientBackground";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ClientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Architecture />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
