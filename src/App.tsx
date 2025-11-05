import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar"; // Cambiado de "/components/layout/Navbar"
import HomePage from "./pages/HomePage"; // Cambiado de "/pages/HomePage"
import PortfolioPage from "./pages/PortfolioPage"; // Cambiado de "/pages/PortfolioPage"
import AdminPanelPage from "./pages/AdminPanelPage"; // Cambiado de "/pages/AdminPanelPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;