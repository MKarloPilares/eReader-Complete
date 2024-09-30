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

const Chapter = () => {
    let navigate = useNavigate();
    const [post, setPost] = useState<any[]>([]);
    const location = useLocation();
    const {Query, LessName, LessDesc, Language} = location.state || {};
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      console.log(LessName)
      const requestData = {
          LessName: Query,
        };
      
        try {
          const response = await fetch('http://127.0.0.1:8000/chapters', {
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
        ChapName: ChapName,
        LessName: LessName,
        Language: Language
      }
    })
  }

  const loadImage = (element: ArrayBuffer) => {
    const CHUNK_SIZE = 0x8000;
    const byteCharacters: string[] = [];
    const array = new Uint16Array(element);

    for (let offset = 0; offset < array.length; offset += CHUNK_SIZE) {
        const chunk = array.slice(offset, offset + CHUNK_SIZE);
        byteCharacters.push(String.fromCharCode(...chunk));
    }

    const blobBTOA = btoa(byteCharacters.join(''));
    const url = `data:image/png;base64,${blobBTOA}`;
    return url;
}


    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">
            <Container>
                <Row xs='auto'>
                    <h1 style={{ fontSize: '5vw', backgroundImage: 'linear-gradient(to right, #f12711, #f5af19)', WebkitBackgroundClip: 'text', color: 'transparent' }}>{LessName}</h1>
                </Row>
                <Row xs='auto'>
                    <p className="subHead">{LessDesc}</p>
                </Row>
                {post.map((mess: any, index: number) => 
                <Row xs='auto' key={index}>
                    <Row xs='auto' style={{paddingTop: '20px', paddingBottom: '20px'}}>
                        <Card border= "success" style={{ padding: '20px' }}>
                            <Card.Img className='img-fluid' src={loadImage(mess.ChapImg.data)} style={{ }}/>
                            <Card.Body>
                                <CardSubtitle style={{  fontSize: '2.5vw'}}>{mess.ChapName}</CardSubtitle>
                                <CardTitle style={{  fontSize: '5vw', fontWeight: 'bolder'}}>{mess.ChapDesc}</CardTitle>
                                <Button variant="primary" size='lg' onClick={() => goToPage("/Less_Question", LessDesc, mess.ChapName)} style={{  backgroundColor: '#FFD700', border: 'none'}}
                                    ><CIcon icon={cilArrowThickRight} style={{ width: '50px', height: '50px' }}/></Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Row>)}
            </Container>
        </ThemeProvider>
    );
};

export default Chapter;