import './App.css';
import Cart from './components/Cart';
import Destacado2 from './components/Destacado2';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import CartContextProvider from './components/context/CartContext';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div className='App'>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path={"/"} element={<ItemListContainer />} />
              <Route path={"/category/:id"} element={<ItemListContainer />} />
              <Route path={"/item/:id"} element={<ItemDetailContainer />} />
              <Route path={"/destacados"} element={<Destacado2 />} />
              <Route path={"/cart"} element={<Cart />} />
              <Route path={"/checkout"} element={<Checkout />} />
              <Route path={"/thankyou/:orderId"} element={<ThankYou />} />
              <Route path={"/*"} element={<Error404 />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
