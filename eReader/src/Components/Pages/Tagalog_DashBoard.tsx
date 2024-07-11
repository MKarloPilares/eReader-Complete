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


const Tag_DashBoard = () => {
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
            <h1>E-Reader para sa Bagong Mambabasa</h1>
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
                          <h4>Mga Aralin sa Filipino</h4>
                        </div>
                        <div className="card-descript">
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="card-btn">
                          <div className="d-grid gap-2">
                            <Button onClick={() => goToPage('/Tag_Lessons')} variant="success"  size='lg'>Simulan natin Mag-aral!</Button>
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
                          <h4>Quiz & Activities</h4>
                        </div>
                        <div className="card-descript">
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="card-btn">
                          <div className="d-grid gap-2">
                            <Button onClick={() => goToPage('/Tag_Assessments')} variant="success"  size='lg'>Subukin ang Sarili</Button>
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

export default Tag_DashBoard;
