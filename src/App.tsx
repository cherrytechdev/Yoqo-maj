import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { SolutionsPage } from './pages/SolutionsPage'
import { PlatformPage } from './pages/PlatformPage'
import { SecurityPage } from './pages/SecurityPage'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#030914] text-white flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/solutions"  element={<SolutionsPage />} />
            <Route path="/platform"   element={<PlatformPage />} />
            <Route path="/security"   element={<SecurityPage />} />
            <Route path="/contact"    element={<ContactPage />} />
            {/* Fallback → Home */}
            <Route path="*"           element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App