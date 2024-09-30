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


const Eng_DashBoard = () => {
  let navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page);
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container fluid="sm">
          <Row xs="auto">
            <Col>
              <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10vw', backgroundImage: 'linear-gradient(to right, #f12711, #f5af19)', WebkitBackgroundClip: 'text', color: 'transparent'}}>ENGLISH</h1>
            </Col>
          </Row>
          <Row xs="auto">
            <Col xs={12} md={6}>
              <Card border="success" style={{ }}> 
                  <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={img1}/> 
                <Card.Body>
                  <Card.Title> LESSONS</Card.Title>
                  <Button variant="success"  onClick={() => goToPage("/Eng_Lessons")} size='lg'style={{ fontWeight: 'bold'}}>Let's Begin!</Button>
                </Card.Body>
              </Card>
            </Col>
          <Col xs={12} md={6}>
            <Card border="success" style={{  }}> 
                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={img2}/> 
              <Card.Body>
                <Card.Title> ASSESSMENT</Card.Title>
                <Button onClick={() => goToPage('/Eng_Assessments')} variant="success"  size='lg'style={{ fontWeight: 'bold' }}>Challenge Accepted!</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  </ThemeProvider>
  );
};

export default Eng_DashBoard;
