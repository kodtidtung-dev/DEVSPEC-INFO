import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About/About'
import { Projects } from '@/components/sections/Projects/Projects'
import { Contact } from '@/components/sections/Contact/Contact'
import { aboutContent } from '@/app/content/about'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About {...aboutContent} />
      <Projects />
      <Contact />
    </main>
  )
}
