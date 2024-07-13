import { useState, useEffect } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Stack} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

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
          const response = await fetch('http://localhost:8000/assessments', {
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
        AssName: AssName
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
   <body>
      <div className="pane">
        <div className="container">
          <div className="header">
            <h3>Tagalog Dashboard / Assessment</h3>
            <h1>Tagalog Assessments</h1>
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
                              <img src={loadImage(mess.AssImg.data)} alt="Lessons" />
                            </div>
                            <div className="card-title">
                              <h4>{mess.AssName}</h4>
                            </div>
                            <div className="card-descript">
                              <p>{mess.AssDesc}</p>
                            </div>
                            <div className="card-btn">
                            <div className="d-grid gap-2">
                              <Button onClick={() => goToPage("/Oral_Assessment", mess.AssName)} variant="success"  size='lg'>Time to Learn!</Button>
                            </div>
                          </div>
                        </div>
                      {index + 1 < post.length && (
                        <div className="container-card">
                            <div className="card-img">
                              <img src={loadImage(post[index+1].AssImg.data)} alt="Lessons" />
                            </div>
                            <div className="card-title">
                              <h4>{post[index+1].AssName}</h4>
                            </div>
                            <div className="card-descript">
                              <p>{post[index+1].AssDesc}</p>
                            </div>
                            <div className="card-btn">
                            <div className="d-grid gap-2">
                              <Button onClick={() => goToPage("/Oral_Assessment", post[index+1].AssName)} variant="success"  size='lg'>Time to Learn!</Button>
                            </div>
                          </div>
                        </div>
                      )}
                  </Stack> ) : (<p></p>)}
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

export default Tag_Assessment;