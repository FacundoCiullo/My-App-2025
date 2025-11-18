import './App.css';
import Cart from './components/Cart';
import Inicio from './components/Inicio';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ItemDetailContainer from './components/items/ItemDetailContainer';
import ItemListContainer from './components/items/ItemListContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartContextProvider from './context/CartContext';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesList from "./components/FavoritesList";
import { AuthProvider } from "./context/AuthContext"; // ✅ import
import AdminDashboard from "./Admin/AdminDashboard";
import HistorialCompras from "./components/HistorialCompras";



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
