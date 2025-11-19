import './style/App.css';

import Inicio from './pages/Inicio';
import Error404 from './pages/Error404';
import ThankYou from './pages/ThankYou';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';
import FavoritesList from './components/user/FavoritesList';
import HistorialCompras from './components/user/HistorialCompras';

import ItemListContainer from './components/items/ItemListContainer';
import ItemDetailContainer from './components/items/ItemDetailContainer';

import AdminDashboard from './Admin/AdminDashboard';

import CartContextProvider from './context/CartContext';
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  return (
    <div className='App'>
      <AuthProvider>
        <FavoritesProvider>
          <CartContextProvider>
            <BrowserRouter>
              <NavBar />
              <main>
                <Routes>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/" element={<Inicio />} />
                  <Route path="/Home" element={<Inicio />} />
                  <Route path="/Productos" element={<ItemListContainer />} />
                  <Route path="/historial" element={<HistorialCompras />} />
                  <Route path="/favoritos" element={<FavoritesList />} />
                  <Route path="/category/:id" element={<ItemListContainer />} />
                  <Route path="/item/:id" element={<ItemDetailContainer />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/thankyou/:orderId" element={<ThankYou />} />
                  <Route path="/*" element={<Error404 />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </CartContextProvider>
        </FavoritesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
