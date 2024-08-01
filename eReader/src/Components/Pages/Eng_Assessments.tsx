import { useState, useEffect } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Eng_Assessment = () => {
  let navigate = useNavigate();
  const [post, setPost] = useState<any[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const requestData = {
          Language: 'English',
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
        Language: "English"
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
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container>
        <Row>
        <h1 className='text-dark' style={{fontSize: '100px', width: '1200px', paddingRight: '120px', textAlign: 'center', marginBottom: '20px'}}>English Assessments</h1>
        </Row> 
        {post.map((mess: any, index: number) => 
        <div key={index}>
        {index % 2 != 1 ? (
        <Row>
          <Col class="col-md-5 col-md-offset-2">
          <Card border="success" style={{ width: '30rem', height: '33rem' }}> 
          <Card.Img variant="top"  style={{borderBottom: 'gray 1px solid', height: '380px'}} src={loadImage(mess.AssImg.data)}/> 
          <Card.Body>
            <Card.Title>{mess.AssName}</Card.Title>
            <Card.Text>{mess.AssDesc}</Card.Text>
            <Button variant="success"  onClick={() => goToPage("/Oral_Assessment", mess.AssName)} size='lg'style={{position: "relative", left: "350px", fontWeight: 'bold'}}>START</Button>
          </Card.Body>
          </Card>
          </Col>
          {index + 1 < post.length && (
          <Col class="col-md-4">
          <Card border="success" style={{ width: '30rem', height: '33rem' }}> 
          <Card.Img variant="top" style={{borderBottom: 'gray 1px solid', height: '380px'}} src={loadImage(post[index+1].AssImg.data)}/> 
          <Card.Body>
            <Card.Title>{post[index+1].AssName}</Card.Title>
            <Card.Text>{post[index+1].AssDesc} </Card.Text>
            <Button variant="success" onClick={() => goToPage("/Oral_Assessment", post[index+1].AssName)}  size='lg'style={{position: "relative", left: "350px", fontWeight: 'bold'}}>START</Button>
          </Card.Body>
          </Card>
          </Col>)}
      </Row> ) : (<p></p>)}
      </div>)}
    </Container>
    </ThemeProvider>
  );
};

export default Eng_Assessment;