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
import { Footer } from './components/Footer';
import { Reveal } from './animations/Reveal';

function App() {
  return (
    <div className="min-h-screen bg-[#030914] text-white flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Reveal direction="up"><About /></Reveal>
        <Reveal direction="left"><Solutions /></Reveal>
        <Reveal direction="up"><Operations /></Reveal>
        <Reveal direction="right"><Security /></Reveal>
        <Reveal direction="zoom"><Cards /></Reveal>
        <Reveal direction="up"><MobileApp /></Reveal>
        <Reveal direction="left"><Infrastructure /></Reveal>
        <Reveal direction="up"><Launch /></Reveal>
        <Reveal direction="zoom"><Regulation /></Reveal>
        <Reveal direction="up"><Contact /></Reveal>
      </main>
      <Footer />
    </div>
  )
}

export default App