import About from "@/components/About";
import Achievements from "@/components/Achievements";
import ArchitecturePlayground from "@/components/ArchitecturePlayground";
import Certifications from "@/components/Certifications";
import ClientBackground from "@/components/ClientBackground";
import Contact from "@/components/Contact";
import DataQualityDashboard from "@/components/DataQualityDashboard";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ClientBackground />
      {/* top fade so scrolling content dissolves before reaching the navbar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-bg via-bg/85 to-transparent" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Skills />
        <Experience />
        <ArchitecturePlayground />
        <DataQualityDashboard />
        <Projects />
        <Impact />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
