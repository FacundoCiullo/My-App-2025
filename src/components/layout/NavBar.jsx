import "./style/Layout.css";
import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ActualizarProductos from "../../Admin/ActualizarProductos";
import CartWidget from "../user/CartWidget";
import {
  BsBoxes,
  BsHouseFill,
  BsBoxSeamFill,
  BsTelephoneFill,
  BsCartCheckFill,
  BsBookmarkStarFill,
} from "react-icons/bs";
import {
  FaUserCircle,
  FaBook,
  FaSignOutAlt,
  FaCog,
  FaGoogle,
} from "react-icons/fa";


const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user] = useAuthState(auth);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const adminEmail = "facundonahuel.ciullo@gmail.com";
  const esAdmin = user?.email === adminEmail;

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className="navbar-custom shadow-sm px-4 py-2 border-bottom border-secondary"
      >
        <div className="d-flex align-items-center justify-content-center gap-5 w-100">

          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <BsBoxes size={28} className="me-2" />
          </Navbar.Brand>

          {/* Links del menú */}
          <Nav className="d-none d-lg-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/Home" className="nav-underline text-white fw-light fs-6">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/Productos" className="nav-underline text-white fw-light fs-6">
              Productos
            </Nav.Link>

            <Nav.Link as={Link} to="/Contactos" className="nav-underline text-white fw-light fs-6">
              Contacto
            </Nav.Link>
          </Nav>

          {/* Carrito */}
          <CartWidget />

          {/* Avatar */}
          <Button variant="link" onClick={() => setShowMenu(true)} className="p-0 border-0">
            {user ? (
              <img src={user.photoURL} alt="usuario" className="nav-avatar" referrerPolicy="no-referrer" />
            ) : (
              <FaUserCircle size={28} color="white" />
            )}
          </Button>

        </div>
      </Navbar>

      {/* SIDEBAR */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end" className="bg-dark text-light">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Mi cuenta</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {user ? (
            <>
              {/* Perfil */}
              <div className="text-center mb-3">
                <img src={user.photoURL} alt="usuario" referrerPolicy="no-referrer" className="sidebar-avatar" />
                <h6 className="mt-2">{user.displayName}</h6>
                <p className="text-secondary small">{user.email}</p>
              </div>

              <hr className="border-secondary" />

              {/* Links */}
              <Link to="/Home" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <BsHouseFill className="me-2" /> Inicio
              </Link>

              <Link to="/Productos" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <BsBoxSeamFill className="me-2" /> Productos
              </Link>

              <Link to="/Contactos" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <BsTelephoneFill className="me-2" /> Contactos
              </Link>

              <hr className="border-secondary" />

              <Link to="/cart" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <BsCartCheckFill className="me-2" /> Carrito
              </Link>

              <Link to="/favoritos" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <BsBookmarkStarFill className="me-2" /> Favoritos
              </Link>

              <Link to="/historial" className="sidebar-link" onClick={() => setShowMenu(false)}>
                <FaBook className="me-2" /> Historial de compras
              </Link>

              {/* ADMIN */}
              {esAdmin && (
                <>
                  <hr className="border-secondary" />
                  <Link to="/admin" className="sidebar-link" onClick={() => setShowMenu(false)}>
                    <FaCog className="me-2" /> Panel de administración
                  </Link>

                  <div className="mt-3">
                    <ActualizarProductos />
                  </div>
                </>
              )}

              <hr className="border-secondary" />

              <Button variant="outline-secondary" className="w-100" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Cerrar sesión
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p>Iniciá sesión para ver tus datos.</p>

              <Button
                variant="outline-light"
                onClick={handleLogin}
                className="d-flex align-items-center justify-content-center mx-auto"
              >
                <FaGoogle className="me-2" /> Iniciar sesión con Google
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
