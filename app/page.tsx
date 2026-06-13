import { BootScreen } from "@/components/boot-screen"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Ticker } from "@/components/ticker"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { SectionRail } from "@/components/section-rail"
import { StatusBar } from "@/components/status-bar"
import { Mascot } from "@/components/mascot"
import { BackToTop } from "@/components/back-to-top"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-9">
      <BootScreen />
      <Header />
      <Hero />
      <Ticker />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <StatusBar />
      <Mascot />
      <BackToTop />
    </div>
  )
}
