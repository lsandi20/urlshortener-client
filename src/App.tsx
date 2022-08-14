import {
  Button,
  Navbar,
  Container,
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>URL Shortener</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-2">
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Enter Long URL</Form.Label>
              <Form.Control type="text" placeholder="Paste long URL here" />
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
          {process.env.REACT_APP_API_URL}
        </Card>
      </Container>
    </div>
  );
}

export default App;
