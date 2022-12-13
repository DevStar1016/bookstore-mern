import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Bookstore</h1>
      </main>
      <Footer />
    </div>
  );
};

export default App;
