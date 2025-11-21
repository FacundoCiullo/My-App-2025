// src/components/layout/Layout.jsx
import NavBar from "./NavBar";
import MobileNavbar from "./MobileNavbar";
import Footer from "./Footer";
import './style/layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "70px", paddingBottom: "70px" }}>
        {children}
      </div>
      <MobileNavbar />
      <Footer />
    </>
  );
};

export default Layout;