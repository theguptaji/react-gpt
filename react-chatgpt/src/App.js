import './App.css';
import axios from "axios";
import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyCard from './components/MyCard';


function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // TODO: Add a modal card in a bottom array with question and answer
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-GPT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Container className='containergpt'>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
      
      
    </Container>   
    <Container>
    <MyCard response={response} question={prompt}/>
    </Container>
    <Container className='scrollableX'>
      <Row className='scrollableRow'>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
          <Col><MyCard response={"I am a response"} question={"I am a question?"}/></Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
