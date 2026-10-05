import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from "./components/About"
import { Solutions } from "./components/Solutions";
import { Operations } from "./components/Operations"
import { Security } from "./components/Security";
import { Cards } from "./components/Cards";
import { MobileApp } from "./components/MobileApp";
import { Infrastructure } from './components/Infrastructure';
import { Launch } from './components/Launch';
import { Regulation } from './components/Regulation';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#030914] text-white flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Solutions />
        <Operations />
        <Security />
        <Cards />
        <MobileApp />
        <Infrastructure />
        <Launch />
        <Regulation />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App