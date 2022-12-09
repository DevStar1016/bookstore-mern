import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Container>
          <h1>Bookstore website</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
