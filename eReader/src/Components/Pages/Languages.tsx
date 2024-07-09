import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import "./LandingPage.css"
import { useNavigate } from 'react-router-dom';
import ereaderlogo from "../Images/e-reader_Logo.svg" ;
import Eng_Icon from "../Images/Eng_Icon.svg"
import Tag_Icon from "../Images/Fil_Icon.svg"


const Languages = () => {
  let navigate = useNavigate();

  const goToEnglish = () => {
    navigate('/Eng_DashBoard');
  };

  const goToTagalog = () => {

    navigate('/Tag_Dashboard');
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Container>
      <body>
        <Container>
            <div className="pane">
                <div className="container">
                    <img className="logo" src={ereaderlogo} alt="E-Reader Logo" />
                    <div><label>Select Module Type</label></div>
                    <div className="btn-container">
                        <div id="btn"></div>
                        <button className="toggle-btn" type="button" onClick={goToEnglish} ><img className="icon1" src={Eng_Icon} alt="E-Reader Logo" />English Module</button>
                        <button className="toggle-btn" type="button" onClick={goToTagalog}><img className="icon2" src={Tag_Icon} alt="E-Reader Logo" />Filipino Module</button>
                    </div>
                </div>
            </div>
    </Container>
    </body>
      </Container>
    </ThemeProvider>
  );
};

export default Languages;
