import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Navb = ()=>{
    return(
        <>
        <Navbar variant="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="#home">Tele-Med</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">FAQs</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
          <Button variant="success" className='nav-buttons'>Login</Button>
          <Button variant="success" className='nav-buttons'>Register</Button>
        </Container>
      </Navbar>
        </>
    );
};
export default Navb;