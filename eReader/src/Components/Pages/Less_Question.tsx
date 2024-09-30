import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import partyPopper from '../Images/party-popper.gif';
import trophy from '../Images/Trophy.png';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
      webkitSpeechRecognition: any;
    }
  }

const Less_Question = () => {
    let navigate = useNavigate();
    const [post, setPost] = useState<any[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('X');
    const [loading, setLoading] = useState(true);
    const [indexCheck, setIndexCheck] = useState(1);
    const location = useLocation();
    const {LessDesc, ChapName, LessName, Language} = location.state || {};

    let recognition = new window.webkitSpeechRecognition(); 

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        const requestData = {
            ChapName: ChapName,
        };
        
        try {
            console.log(ChapName)
            const response = await fetch('http://127.0.0.1:8000/lesson_questions', {
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
        setRecognizedText('X')
        if (Language == "English") {
            recognition.lang = 'en-US';
        }
        else if (Language == "Tagalog") {
            recognition.lang = 'tl-PH';
        }
        recognition.continuous = true; // Enable continuous recognition
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setRecognizedText(transcript);
        
        };
        if (recognizedText === '') {
            setRecognizedText('X')
          }
        recognition.start();
      };
    
      const stopSpeechRecognition = () => {
        recognition.start();
        recognition.stop();
        setIsListening(false);
      };
    

      const loadObject = (element: ArrayBuffer, urlString: string): string => {
        const CHUNK_SIZE = 0x8000;
        const byteCharacters: string[] = [];
        const array = new Uint16Array(element);
    
        for (let offset = 0; offset < array.length; offset += CHUNK_SIZE) {
            const chunk = array.slice(offset, offset + CHUNK_SIZE);
            byteCharacters.push(String.fromCharCode(...chunk));
        }
    
        const blobBTOA = btoa(byteCharacters.join(''));
        const url = `${urlString},${blobBTOA}`;
        return url;
    }
    

        const start = async (element) => {
            const url = loadObject(element, `data:audio/mp3;base64` )
            const audio = new Audio(url)
            audio.load()
            audio.play()
          }

          const goToPage = (page, query, LessDesc) => {
            navigate(page, {
              state: {
                Query: query,
                LessName: query,
                LessDesc: LessDesc
              }
            })
          }


    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{ padding: '20px' }}>
                <Row xs='auto' style={{  }}>
                    <Col style={indexCheck-1 == post.length ? {visibility:'hidden'} : {}}>
                        <h1 style={{ fontSize: '5vw', backgroundImage: 'linear-gradient(to right, #f12711, #f5af19)', WebkitBackgroundClip: 'text', color: 'transparent' }} >{ChapName}</h1>
                        {LessDesc}
                    </Col>
                </Row>
                {post.map((item: any, index: number) => 
                <Row xs='auto'>
                    {indexCheck-1 == index ? (
                    <Container fluid style={{ border: '1px solid black' }}> 
                        <Row xs='auto'>
                            <Col xs={12} m={8} style={{ margin: '5px'}}> 
                                <h4>Direction: Read it loud and record your voice using the flashcards that shows on your screen.</h4> 
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} m={8}>
                                {item && item.QuestCard ? (
                                    <Image className="img-fluid" src={loadObject(item.QuestCard.data, "data:image/png;base64")} style={{}}></Image>
                                ) : (
                                    <div>No video available</div>
                                )}
                            </Col>
                        </Row>
                        <Row xs='auto' style={{marginTop: '20px', marginBottom: '50px' }}>
                            <Col>
                                <div className='d-grid gap-2'>
                                    <Button variant="danger" size="lg" onClick={() => start(item.QuestAud.data)} style={{}}>PLAY SOUND</Button>
                                </div>
                            </Col>
                            <Col>
                                <div className='d-grid gap-2'>
                                    <Button variant="primary" size="lg" style={{}} onClick={isListening ? stopSpeechRecognition : startSpeechRecognition} 
                                    disabled={recognizedText=== 'X' && isListening}>
                                     {isListening ? "STOP RECORDING" : "RECORD"} </Button>
                                </div>
                                <h3 style={item.QuestAns.toLowerCase().includes(recognizedText) ? ({color: 'green'}) : (recognizedText !== 'X' ? ({color: 'red'}) : 
                                    ({visibility: 'hidden'}))}>{item.QuestAns.toLowerCase().includes(recognizedText)  ? ("CORRECT! GOOD JOB!") : ("TRY AGAIN! YOU CAN DO IT!")}</h3>
                            </Col>
                        </Row>
                        <Row  xs='auto' style={{ marginBottom: '50px' }}>
                            <Col xs={12} m={8}>
                                <Button variant="warning" size="lg" style={indexCheck-1 <= 0 ? {visibility: 'hidden'} : {}} onClick={() => {setIndexCheck(indexCheck-1); setRecognizedText('X')}}> BACK </Button>
                            </Col>
                            <Col xs={12} m={8}>
                                <div className='d-grid gap-2'>
                                    <Button variant="success" size="lg" onClick={() => {setIndexCheck(indexCheck+1); setRecognizedText('X')}}> NEXT </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    ) : (<h2></h2>)
                    }
                </Row>
                )}
                <Container style={indexCheck-1 < post.length ? {visibility:'hidden'} : {}}>
                    <h1 style={{position: 'fixed', fontSize: '5vw', left: '30vw', bottom: '75vh', backgroundImage: 'linear-gradient(to right, #f12711, #f5af19)', 
                    WebkitBackgroundClip: 'text', color: 'transparent'}}>Congratulations!</h1>
                    <Image src={partyPopper} style={{position: 'fixed', bottom: '19vh', left: '10vw', width: '30vw'}}></Image>
                    <Image src={trophy} style={{position: 'fixed', zIndex: '50', bottom: '20vh', right: '25vw', width: '50vw'}}></Image>
                    <Image src={partyPopper} style={{transform: 'scaleX(-1)', position: 'fixed', bottom: '20vh', left: '58vw', width: '30vw'}}></Image>
                    <Button variant='success' size='lg' onClick={() => goToPage("/Chapters", LessName, LessDesc)} style={{position: 'fixed', bottom: '15vh', left: '25vw', width: '50vw'}}>Back to Chapters</Button>
                </Container>
                <Row style={{ paddingTop: '50px', paddingBottom: '20px' }}>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Less_Question;
