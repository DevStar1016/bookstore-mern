import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>Copyright &copy; CatBooks</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
