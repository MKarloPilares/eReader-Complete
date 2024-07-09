import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Tag_Lessons = () => {
    let navigate = useNavigate();
    const [post, setPost] = useState<any[]>([]);
    useEffect(() => {
      fetchData();
    }, []);

    const goToPage = (page, query, LessDesc) => {
      navigate(page, {
        state: {
          Query: query,
          LessName: query,
          LessDesc: LessDesc
        }
      })
    }
  
    const fetchData = async () => {
        const requestData = {
            Language: 'Tagalog',
          };
        
          try {
            const response = await fetch('http://localhost:8000/lessons', {
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
            <Container>
                <Row>
                    <h1 className="text-dark" style={{fontSize: '100px', width: '1200px', paddingRight: '120px',  textAlign: 'center', marginBottom: '20px'}}>Tagalog Lessons</h1>
                </Row>
                {post.map((mess: any, index: number) => 
                <div key={index}>
                    {index % 2 != 1 ? (
                        <Row>
                            <Col class="col-md-5 col-md-offset-2">
                                <Card border="success" style={{ width: '30rem' }}> 
                                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={loadImage(mess.LessImg.data)}/>
                                    <Card.Body>
                                        <Card.Title>{mess.lessName}</Card.Title>
                                        <Card.Text>{mess.lessDesc}</Card.Text>
                                        <Button variant="success"  onClick={() => goToPage('/Chapters', mess.lessName, mess.lessDesc )} size='lg'style={{position: "relative", left: "300px", fontWeight: 'bold'}}>Let's Begin!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {index + 1 < post.length && (
                            <Col class='col-md-2'>
                                <Card border="success" style={{ width: '30rem' }}>
                                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={loadImage(post[index+1].LessImg.data)}/> 
                                    <Card.Body>
                                        <Card.Title>{post[index+1].lessname} </Card.Title>
                                        <Card.Text>{post[index+1].lessDesc} </Card.Text>
                                        <Button variant="success"  onClick={() => goToPage('/Chapters', post[index+1].lessName, post[index+1].lessDesc)}
                                         size='lg'style={{position: "relative", left: "220px", fontWeight: 'bold'}}>Challenge Accepted!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row> ) : (<p></p>)}
                </div>)}
            </Container>
        </ThemeProvider>
    );
};

export default Tag_Lessons;