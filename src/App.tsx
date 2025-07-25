import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import CustomizerPage from "./pages/CustomizerPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SuccessPage from "./pages/SuccessPage";
import OrderJsonLoader from "./pages/src/pages/OrderViewer.tsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.tsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customize" element={<CustomizerPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/load-json" element={<OrderJsonLoader />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
