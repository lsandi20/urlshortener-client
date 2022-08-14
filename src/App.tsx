import {
  Button,
  Navbar,
  Container,
  Form,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

function App() {
  const [links, setLink] = useState(null);
  const [original, setOriginal] = useState("");
  const [short, setShort] = useState("");

  const getLinks = async () => {
    const res = await request.get("/links");
    const linkData = res.data.map((link: any, index: number) => {
      return (
        <ListGroupItem key={index}>
          <a
            href={process.env.REACT_APP_API_URL + "/" + link.short}
            target="_blank"
          >
            {process.env.REACT_APP_API_URL + "/" + link.short}
          </a>{" "}
          -{" "}
          <a href={link.original} target="_blank">
            {link.original}
          </a>
        </ListGroupItem>
      );
    });
    setLink(linkData);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginal(event.currentTarget.value);
  };

  const shortenLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await request.post("/link", { original });
    setShort(`${process.env.REACT_APP_API_URL}/${res.data.short}`);
    getLinks();
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>URL Shortener</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Form onSubmit={shortenLink}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Enter Long URL</Form.Label>
              <Form.Control
                value={original}
                type="url"
                placeholder="Paste long URL here"
                required
                onChange={handleLinkChange}
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button variant="primary" type="submit">
                Shorten
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="mt-2">
        Shortened URL
        <Card className="mt-2" body>
          <a href={short} target="_blank">
            {short}
          </a>
        </Card>
      </Container>
      <Container className="mt-3 mb-5">
        Link History
        <Card className="mt-2">
          <ListGroup>{links}</ListGroup>
        </Card>
      </Container>
    </div>
  );
}

export default App;
