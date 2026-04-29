import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Software from "./pages/Software";
import WebDev from "./pages/WebDev";
import GraphicDesign from "./pages/GraphicDesign"
import Seo from "./pages/Seo"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"
import Store from "./pages/Store"
import Success from "./pages/Success";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/software" element={<Software />} />
        <Route path="/About" element={<About />} />
        <Route path="/services/webdev" element={<WebDev />} />
        <Route path="/services/GraphicDesign" element={<GraphicDesign />} />
        <Route path="/services/Seo" element={<Seo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;