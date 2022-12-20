import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/HomePage";
import BookDetail from "./pages/BookDetail/BookDetail";
import Cart from "./pages/Cart/Cart";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
