import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import img1 from '../Images/lesson1.jpg';

const Lessons = ({setCurrentPage, setQuery}) => {
    const [post, setPost] = useState<any[]>([]);
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/lessons');
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
                    <h1 className="text-dark" style={{fontSize: '120px', width: '1200px', paddingRight: '120px',  textAlign: 'center'}}>Time to Learn!</h1>
                </Row>
                {post.map((mess: any, index: number) => 
                <div key={index}>
                    {index % 2 != 1 ? (
                        <Row>
                            <Col class="col-md-5 col-md-offset-2">
                                <Card border="success" style={{ width: '30rem' }}> 
                                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={loadImage(mess.Lessimg.data)}/>
                                    <Card.Body>
                                        <Card.Title>Lesson {mess.LessNum}: {mess.lessname}</Card.Title>
                                        <Card.Text>{mess.Lessdec}</Card.Text>
                                        <Button variant="success"  onClick={() => {setCurrentPage("Lesson1"); setQuery("lesson" + mess.LessNum.toString())}} size='lg'style={{position: "relative", left: "300px", fontWeight: 'bold'}}>Let's Begin!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {index + 1 < post.length && (
                            <Col class='col-md-2'>
                                <Card border="success" style={{ width: '30rem' }}>
                                <Card.Img variant="top" style={{borderBottom: 'gray 1px solid'}} src={loadImage(post[index+1].Lessimg.data)}/> 
                                    <Card.Body>
                                        <Card.Title>Lesson {post[index+1].LessNum}: {post[index+1].Lessname} </Card.Title>
                                        <Card.Text>{post[index+1].Lessdec} </Card.Text>
                                        <Button variant="success"  onClick={() => {setCurrentPage("Lesson1"); setQuery("lesson" + post[index+1].LessNum.toString())}} size='lg'style={{position: "relative", left: "220px", fontWeight: 'bold'}}>Challenge Accepted!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row> ) : (<p></p>)}
                </div>)}
            </Container>
        </ThemeProvider>
    );
};

export default Lessons;