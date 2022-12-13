import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/HomePage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/book/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
