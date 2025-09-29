import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Menu from './pages/Menu'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import KitchenDashboard from './pages/KitchenDashboard'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </CartProvider>
  )
}

export default App
