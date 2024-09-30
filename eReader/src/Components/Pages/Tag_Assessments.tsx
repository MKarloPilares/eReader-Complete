import { useState, useEffect } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Tag_Assessment = () => {
  let navigate = useNavigate();
  const [post, setPost] = useState<any[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const requestData = {
          Language: 'Tagalog',
        };
      
        try {
          const response = await fetch('http://127.0.0.1:8000/assessments', {
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
  
  const goToPage = (page, AssName) => {
    navigate(page, {
      state: {
        AssName: AssName,
        Language: "Tagalog"
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
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container fluid='xs'>
        <Row xs='auto'>
        <h1 className='text-dark' style={{fontSize: '5vw', backgroundImage: 'linear-gradient(to right, #f12711, #f5af19)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Tagalog Assessments</h1>
        </Row> 
        {post.map((mess: any, index: number) => 
        <div key={index}>
        {index % 2 != 1 ? (
        <Row xs='auto'>
          <Col xs={12} md={6}>
          <Card border="success" style={{  }}> 
          <Card.Img variant="top"  style={{borderBottom: 'gray 1px solid', height: '380px'}} src={loadImage(mess.AssImg.data)}/> 
          <Card.Body>
            <Card.Title>{mess.AssName}</Card.Title>
            <Card.Text>{mess.AssDesc}</Card.Text>
            <Button variant="success"  onClick={() => goToPage("/Oral_Assessment", mess.AssName)} size='lg'style={{ fontWeight: 'bold'}}>Simulan!</Button>
          </Card.Body>
          </Card>
          </Col>
          {index + 1 < post.length && (
          <Col xs={12} md={6}>
          <Card border="success" style={{  }}> 
          <Card.Img variant="top" style={{borderBottom: 'gray 1px solid', height: '380px'}} src={loadImage(post[index+1].AssImg.data)}/> 
          <Card.Body>
            <Card.Title>{post[index+1].AssName}</Card.Title>
            <Card.Text>{post[index+1].AssDesc} </Card.Text>
            <Button variant="success" onClick={() => goToPage("/Oral_Assessment", post[index+1].AssName)} size='lg'style={{ fontWeight: 'bold'}}>Simulan!</Button>
          </Card.Body>
          </Card>
          </Col>)}
      </Row> ) : (<p></p>)}
      </div>)}
    </Container>
    </ThemeProvider>
  );
};

export default Tag_Assessment;