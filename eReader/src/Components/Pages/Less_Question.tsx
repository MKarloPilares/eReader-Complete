import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import RecAudio from '../Images/RecordedAudio.png';
import { Image } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

const Less_Question = () => {
    const [post, setPost] = useState<any[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const [loading, setLoading] = useState(true);
    const [indexCheck, setIndexCheck] = useState(1);
    const location = useLocation();
    const {LessDesc, ChapName} = location.state || {};


    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        const requestData = {
            ChapName: ChapName,
        };
        
        try {
            console.log(ChapName)
            const response = await fetch('http://localhost:8000/lesson_questions', {
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
        } finally {
            setLoading(false); // Update loading state
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    const startSpeechRecognition = () => {
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition(); 
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setRecognizedText(transcript);
        };
        recognition.start();
      };
    
      const stopSpeechRecognition = () => {
        setIsListening(false);
        recognition.stop();
      };
    

      const loadObject = (element, urlString ) => {
        const CHUNK_SIZE = 0x8000;
        const byteCharacters = [];
        const array = new Uint16Array(element);
      
        for (let offset = 0; offset < array.byteLength; offset += CHUNK_SIZE){
          const chunk = array.slice(offset, offset + CHUNK_SIZE);
          byteCharacters.push(String.fromCharCode.apply(null, chunk));
        }
      
        const blobBTOA = btoa(byteCharacters.join(''));
        const url = `${urlString},${blobBTOA}`;
        return(url)
        }

        const start = async (element) => {
            const url = `data:audio/mp3;base64,${btoa(String.fromCharCode(...new Uint8Array(element)))}`;
            const audio = new Audio(url)
            audio.load()
            audio.play()
          }


    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{ padding: '20px' }}>
                <Row style={{ paddingTop: '55px', paddingBottom: '20px' }}>
                    <Col>
                        <h1>{ChapName}</h1>
                        {LessDesc}
                    </Col>
                </Row>
                {post.map((item: any, index: number) => 
                <Row>
                    {indexCheck-1 == index ? (
                    <Container fluid style={{ border: '1px solid black' }}> 
                        <Row>
                            <Col className="col-md-10"> 
                                <h2>Direction: Read it loud and record your voice using the flashcards that shows on your screen. <Image src={RecAudio} rounded style={{ height: '50px', width:'60px' }}></Image></h2> 
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                {item && item.QuestCard ? (
                                    <Image src={loadObject(item.QuestCard.data, "data:image/png;base64")} style={{width: "1180px", height: "500px"}}></Image>
                                ) : (
                                    <div>No video available</div> // Fallback if video is not available
                                )}
                            </Col>
                        </Row>
                        <Row className='justify-content-center' style={{ padding: '20px' }}>
                            <Col md="auto">
                                <Image src={RecAudio} onClick={() => start(item.QuestAud.data)} rounded style={{height: '50px', width:'60px'}}/>
                                <Button variant="primary" size="lg" style={{position: 'relative', left: '38%'}} onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}>
                                     {isListening ? "STOP RECORDING" : "RECORD"} </Button>
                                <p></p>
                                <h3 style={item.QuestAns === recognizedText ? ({color: 'green'}) : (recognizedText !== '' ? ({color: 'red'}) : 
                                    ({visibility: 'hidden'}))}>{item.QuestAns === recognizedText ? ("CORRECT! GOOD JOB!") : ("TRY AGAIN! YOU CAN DO IT!")}</h3>
                            </Col>
                        </Row>
                        <Row className='justify-content-end' style={{ padding: '20px' }}>
                            <Col md="auto" style={{position: 'relative', right: '82%'}}><Button variant="primary" size="lg" onClick={() => setIndexCheck(indexCheck-1)}> BACK </Button></Col>
                            <Col md="auto"><Button variant="primary" size="lg" onClick={() => setIndexCheck(indexCheck+1)}> NEXT </Button></Col>
                        </Row>
                    </Container>
                    ) : (<h2>Chapter Finished! Congratulations!</h2>
                    )}
                </Row>
                )}
                <Row style={{ paddingTop: '50px', paddingBottom: '20px' }}>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Less_Question;
