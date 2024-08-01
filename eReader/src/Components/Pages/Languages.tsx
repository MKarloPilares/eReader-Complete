import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import img1 from '../Images/lessons.jpg';
import img2 from '../Images/assessment.jpg';
import { useNavigate } from 'react-router-dom';


const Languages = () => {
  let navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page);
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container>
          <Row>
          <h1 className='text-dark' style={{fontSize: '120px', width: '1200px', paddingRight: '120px',  textAlign: 'center', marginBottom: "20px"}}>E-Reader</h1>
          </Row>
          <Row>
            <Col class="col-md-5 col-md-offset-2">
              <Card border="success" style={{ width: '30rem' }}> 
                  <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={img1}/> 
                <Card.Body>
                  <Card.Title> ENGLISH</Card.Title>
                  <Button variant="success"  onClick={() => goToPage("/Eng_DashBoard")} size='lg'style={{position: "relative", left: "300px", fontWeight: 'bold'}}>Let's Begin!</Button>
                </Card.Body>
              </Card>
            </Col>
          <Col class='col-md-2'>
            <Card border="success" style={{ width: '30rem' }}> 
                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={img2}/> 
              <Card.Body>
                <Card.Title> TAGALOG</Card.Title>
                <Button onClick={() => goToPage('/Tag_Dashboard')} variant="success"  size='lg'style={{position: "relative", left: "300px", fontWeight: 'bold'}}>Magsimula!</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  </ThemeProvider>
  );
};

export default Languages;
