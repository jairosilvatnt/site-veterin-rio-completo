import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Agenda from './pages/Agenda'
import Clients from './pages/Clients'
import Animals from './pages/Animals'
import AnimalDetails from './pages/AnimalDetails'
import Consultations from './pages/Consultations'
import Budgets from './pages/Budgets'
import Medications from './pages/Medications'
import Reports from './pages/Reports'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/animais" element={<Animals />} />
          <Route path="/animais/:id" element={<AnimalDetails />} />
          <Route path="/atendimentos" element={<Consultations />} />
          <Route path="/orcamentos" element={<Budgets />} />
          <Route path="/medicamentos" element={<Medications />} />
          <Route path="/relatorios" element={<Reports />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
