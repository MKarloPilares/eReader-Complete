import { useState, useEffect } from 'react';
import {CardSubtitle, CardTitle, Row} from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CIcon from '@coreui/icons-react';
import { cilArrowThickRight } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Chapters.css';

const Chapter = () => {
    let navigate = useNavigate();
    const [post, setPost] = useState<any[]>([]);
    const location = useLocation();
    const {Query, LessName, LessDesc} = location.state || {};
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      console.log(LessName)
      const requestData = {
          LessName: Query,
        };
      
        try {
          const response = await fetch('http://localhost:8000/chapters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
          });
          
      const jsonData = await response.json();
      setPost(jsonData.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goToPage = (page , LessDesc, ChapName) => {
    navigate(page, {
      state: {
        LessDesc: LessDesc,
        ChapName: ChapName
      }
    })
  }

    const loadImage = (element) => {
        const CHUNK_SIZE = 0x8000;
        const byteCharacters = [];
        const array = new Uint16Array(element);
    
        for (let offset = 0; offset < array.byteLength; offset += CHUNK_SIZE){
          const chunk = array.slice(offset, offset + CHUNK_SIZE);
          byteCharacters.push(String.fromCharCode.apply(null, chunk));
        }
    
        const blobBTOA = btoa(byteCharacters.join(''));
        const url = `data:image/png;base64,${blobBTOA}`;
        return(url)
      }


    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">
            <body>
              <div className="pane">
                <div className="container">
                  <div className="header">
                    <h3>English Lesson / {LessName}</h3>
                    <h1>{LessName}</h1>
                    <p className="subHead">{LessDesc}</p>
                  </div>
                <div id="lessitems">
                {post.map((mess: any, index: number) => 
                <Row key={index}>
                    <Row style={{paddingTop: '20px', paddingBottom: '20px'}}>
                        <Card border= "success" style={{ width: '1427px', height: '366px'}}>
                            <Card.Img src={loadImage(mess.ChapImg.data)} style={{ position: 'absolute', width: '460px', height: '332px', left: '18px', top: '18px'}}/>
                            <Card.Body>
                                <CardSubtitle style={{ position: 'absolute', left: '485px', top: '30px', fontSize: '46px'}}>{mess.ChapName}</CardSubtitle>
                                <CardTitle style={{ position: 'absolute', left: '485px', top: '82px', fontSize: '52px', fontWeight: 'bolder'}}>{mess.ChapDesc}</CardTitle>
                                <Button variant="primary" onClick={() => goToPage("/Less_Question", LessDesc, mess.ChapName)} style={{ position: 'absolute', width: '182px', height: '116px', right: '29px', bottom: '24px', backgroundColor: '#FFD700', border: 'none'}}
                                    ><CIcon icon={cilArrowThickRight} style={{width: '160px', height: '90px'}}/></Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Row>)}
                </div>
              </div>
            </div>
          </body>
        </ThemeProvider>
    );
};

export default Chapter;