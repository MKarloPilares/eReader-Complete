import { Container } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import img1 from '../Images/lessons.jpg';
import img2 from '../Images/assessment.jpg';
import { useNavigate } from 'react-router-dom';
import {Stack} from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import "./DashBoard.css"


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
  <body>
    <div className="pane">
      <div className="container">
          <div className="header">
            <h3>Electronic Reading Platform</h3> 
            <h1>E-Reader for Early Readers</h1>
          </div>
          <div className="content-wrapper">
              <div className="container-group">
                <div className="group-items">
                  <Row>
                    <Col>
                      <div className="container-card">
                        <div className="card-img">
                          <img src={img1} alt="Lessons" />
                        </div>
                        <div className="card-title">
                          <h4>Lessons in English</h4>
                        </div>
                        <div className="card-descript">
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="card-btn">
                          <div className="d-grid gap-2">
                            <Button onClick={() => goToPage('/Eng_Lessons')} variant="success"  size='lg'>Time to Learn!</Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="container-card">
                        <div className="card-img">
                          <img src={img2} alt="Lessons" />
                        </div>
                        <div className="card-title">
                          <h4>Quizzes & Activities</h4>
                        </div>
                        <div className="card-descript">
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="card-btn">
                          <div className="d-grid gap-2">
                            <Button onClick={() => goToPage('/Eng_Assessments')} variant="success"  size='lg'>Challenge Accepted!</Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
          </div>
        </div>
      </div>
    </body>
  </ThemeProvider>
  );
};

export default Eng_DashBoard;
