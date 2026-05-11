import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import CartDrawer from '@/components/shop/CartDrawer'
import Toast from '@/components/ui/Toast'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Orders from '@/pages/Orders'
import OrderDetail from '@/pages/OrderDetail'
import Profile from '@/pages/Profile'
import Return from '@/pages/Return'
import ReturnPickup from '@/pages/ReturnPickup'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/ordenes" element={<Orders />} />
          <Route path="/ordenes/:id" element={<OrderDetail />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/devolucion" element={<Return />} />
          <Route path="/devolucion/recogida" element={<ReturnPickup />} />
        </Route>
      </Routes>
      <CartDrawer />
      <Toast />
    </>
  )
}
