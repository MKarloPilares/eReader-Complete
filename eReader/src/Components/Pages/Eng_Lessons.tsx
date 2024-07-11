import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Stack} from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

const Eng_Lessons = () => {
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

    const goToPage = (page, query, LessDesc) => {
      navigate(page, {
        state: {
          Query: query,
          LessName: query,
          LessDesc: LessDesc
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
                <h3>English Dashboard / Lessons</h3>
                <h1>E-Reader for Early Readers</h1>
              </div>
              <div className="content-wrapper">
                <div className="container-group">
                  <div className="group-items">
                      {post.map((mess: any, index: number) => 
                      <div key={index}>
                          {index % 2 != 1 ? (
                            <Stack direction="horizontal" gap={3}>
                              <div className="container-card">
                                <div className="card-img">
                                  <img src={loadImage(mess.LessImg.data)} alt="Lessons" />
                                </div>
                                <div className="card-title">
                                  <h4>{mess.lessName}</h4>
                                </div>
                                <div className="card-descript">
                                  <p>{mess.lessDesc}</p>
                                </div>
                                <div className="card-btn">
                                  <div className="d-grid gap-2">
                                    <Button onClick={() => goToPage('/Chapters', mess.lessName, mess.lessDesc )} variant="success"  size='lg'>Time to Learn!</Button>
                                  </div>
                                </div>
                              </div>
                                  {index + 1 < post.length && (
                                    <div className="container-card">
                                      <div className="card-img">
                                        <img  src={loadImage(post[index+1].LessImg.data)} alt="Lessons" />
                                      </div>
                                      <div className="card-title">
                                        <h4>{post[index+1].lessName}</h4>
                                      </div>
                                      <div className="card-descript">
                                        <p>{post[index+1].lessDesc}</p>
                                      </div>
                                      <div className="card-btn">
                                        <div className="d-grid gap-2">
                                          <Button onClick={() => goToPage('/Chapters', post[index+1].lessName, post[index+1].lessDesc)} variant="success"  size='lg'>Time to Learn!</Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {index + 1 < post.length && (
                                    <div className="container-card">
                                      <div className="card-img">
                                        <img  src={loadImage(post[index+1].LessImg.data)} alt="Lessons" />
                                      </div>
                                      <div className="card-title">
                                        <h4>{post[index+1].lessName}</h4>
                                      </div>
                                      <div className="card-descript">
                                        <p>{post[index+1].lessDesc}</p>
                                      </div>
                                      <div className="card-btn">
                                        <div className="d-grid gap-2">
                                          <Button onClick={() => goToPage('/Chapters', post[index+1].lessName, post[index+1].lessDesc)} variant="success"  size='lg'>Time to Learn!</Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                    {index + 1 < post.length && (
                                      <div className="container-card">
                                        <div className="card-img">
                                          <img  src={loadImage(post[index+1].LessImg.data)} alt="Lessons" />
                                        </div>
                                        <div className="card-title">
                                          <h4>{post[index+1].lessName}</h4>
                                        </div>
                                        <div className="card-descript">
                                          <p>{post[index+1].lessDesc}</p>
                                        </div>
                                        <div className="card-btn">
                                          <div className="d-grid gap-2">
                                            <Button onClick={() => goToPage('/Chapters', post[index+1].lessName, post[index+1].lessDesc)} variant="success"  size='lg'>Time to Learn!</Button>
                                          </div>
                                        </div>
                                      </div>
                                  )}
                              </Stack>  ) : (<p></p>)}
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </ThemeProvider>
    );
};

export default Eng_Lessons;