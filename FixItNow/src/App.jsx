import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import RoleSelector from "./pages/RoleSelector";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingModal from "./components/BookingModal";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import { useBooking } from "./context/BookingContext";
import "./App.css";
import BackToTop from "./components/BackToTop";

function App() {
  const { open, service, closeBooking } = useBooking();

  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("customer");

  const startLogin = () => {
    setMode("login");
    setPage("role-select");
  };

  const startRegister = () => {
    setMode("register");
    setPage("role-select");
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setPage(mode);
  };

  const handleRoleSelectorBack = (switchTo) => {
    if (switchTo === "login" || switchTo === "register") {
      setMode(switchTo);
      setPage("role-select");
    } else {
      setPage("home");
    }
  };

  const handleBookService = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleBecomePro = () => {
    setRole("provider");
    setMode("login");
    setPage("login");
  };

  return (
    <>
      <Preloader />
      <ScrollProgress />

      {page === "home" && (
        <Header onLoginClick={startLogin} onRegisterClick={startRegister} />
      )}

      {page === "home" && (
        <Home
          onBookServiceClick={handleBookService}
          onBecomeProClick={handleBecomePro}
        />
      )}

      {page === "role-select" && (
        <RoleSelector
          mode={mode}
          onSelect={handleRoleSelect}
          onBack={handleRoleSelectorBack}
        />
      )}

      {page === "login" && (
        <Login
          role={role}
          onBack={() => setPage("home")}
          onRegisterClick={() => {
            setMode("register");
            setPage("role-select");
          }}
        />
      )}

      {page === "register" && (
        <Register
          role={role}
          onBack={() => setPage("home")}
          onLoginClick={() => {
            setMode("login");
            setPage("role-select");
          }}
        />
      )}

      <BookingModal open={open} service={service} onClose={closeBooking} />
      <BackToTop />
    </>
  );
}

export default App;
