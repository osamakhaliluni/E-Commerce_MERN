import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './context/Auth/AuthProvider';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import CArtProvider from './context/cart/CartProvider';
import CheckOutPage from './pages/CheckOutPage';
import MyOrdersPage from './pages/MyOrdersPage';


function App() {

  return (
    <AuthProvider>
      <CArtProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckOutPage />} />
              <Route path='/my-orders' element={<MyOrdersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CArtProvider>
    </AuthProvider>
  )
}

export default App
