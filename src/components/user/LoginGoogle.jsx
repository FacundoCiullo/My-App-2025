import React from "react";
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

const LoginGoogle = () => {
  const [user] = useAuthState(auth);

  // 🔐 Iniciar sesión con Google
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  // 🚪 Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 👤 Si el usuario ya está logueado
  if (user) {
    return (
      <div className="text-center mt-3">
        <img
          src={user.photoURL}
          alt="usuario"
          referrerPolicy="no-referrer"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
            verticalAlign: "middle",
          }}
        />
        <span style={{ color: "var(--text)", marginRight: "10px" }}>
          {user.displayName}
        </span>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={handleLogout}
          style={{
            borderRadius: "8px",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--clr-gray-dark)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <BoxArrowRight className="me-1" /> Cerrar sesión
        </Button>
      </div>
    );
  }

  // 🔘 Si no hay usuario logueado
  return (
    <div className="text-center mt-3">
      <Button
        variant="light"
        onClick={handleLogin}
        className="shadow-sm d-flex align-items-center justify-content-center mx-auto"
        style={{
          borderRadius: "8px",
          border: "1px solid #ccc",
          padding: "2px 8px",
          width: "fit-content",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >

        Iniciar sesión
      </Button>
    </div>
  );
};

export default LoginGoogle;