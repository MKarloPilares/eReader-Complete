import { useState, useEffect } from "react";
import RecAudio from '../Images/RecordedAudio.png'
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ThemeProvider} from "react-bootstrap";

const OralAssessment = ({setCurrentPage, Query, setQuery, backPage}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [post, setPost] = useState<any[]>([]);
  const [indexCheck, setIndexCheck] = useState(1);
  const [score, setScore] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const requestData = {
          AssName: Query,
        };
      
        try {
          const response = await fetch('http://127.0.0.1:8000/assessment_questions', {
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

  const start = async (element) => {

    const CHUNK_SIZE = 0x8000;
    const byteCharacters = [];
    const array = new Uint16Array(element);
  
    for (let offset = 0; offset < array.byteLength; offset += CHUNK_SIZE){
      const chunk = array.slice(offset, offset + CHUNK_SIZE);
      byteCharacters.push(String.fromCharCode.apply(null, chunk));
    }
  
    const blobBTOA = btoa(byteCharacters.join(''));
    const url = `data:audio/mp3;base64,${blobBTOA}`;
    const audio = new Audio(url)
    audio.load()
    audio.play()
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

  const handleClick = (answer) => {
    if (answer === recognizedText) {
        setIndexCheck(indexCheck + 1);
        setScore(score + 1);
    } else {
        setIndexCheck(indexCheck + 1);
    }
};

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
    <Container fluid="sm" style={{ padding: '20px' }}>
        {post.map((item: any, index: number) => 
        <Row>
        <Row style={{ paddingTop: '55px', paddingBottom: '20px' }}>
            <Col>
                <h1>{item.AssName}</h1>
            </Col>
        </Row>
            {indexCheck-1 == index ? (
            <Container fluid style={{ border: '1px solid black' }}> 
                <Row>
                    <Col className="col-md-10"> 
                        <h2>{item.Quest} <Image src={RecAudio} onClick={() => start(item.AssAud.data)} rounded style={{ height: '50px', width:'60px' }}></Image></h2> 
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        {item && item.AssImg ? (
                            <Image src={loadImage(item.AssImg.data)} style={{width: "1180px", height: "500px"}}></Image>
                        ) : (
                            <div>No Image available</div> // Fallback if video is not available
                        )}
                    </Col>
                </Row>
                <Row className='justify-content-center' style={{ padding: '20px' }}>
                    <Col md="auto">
                        <Button variant="success" size="lg" style={{position: 'relative', left: '38%'}} onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}>
                             {isListening ? "STOP RECORDING" : "RECORD"} </Button>
                        <p></p>
                        <h3 style={item.AssAns === recognizedText ? ({color: 'green'}) : (recognizedText !== '' ? ({color: 'red'}) : 
                            ({visibility: 'hidden'}))}>{item.AssAns === recognizedText ? ("CORRECT! GOOD JOB!") : ("TRY AGAIN! YOU CAN DO IT!")}</h3>
                    </Col>
                </Row>
                <Row className='justify-content-end' style={{ padding: '20px' }}>
                    <Col md="auto" style={{position: 'relative', right: '82%'}}><Button variant="success" size="lg" onClick={() => setIndexCheck(indexCheck-1)}> BACK </Button></Col>
                    <Col md="auto"><Button variant="success" size="lg" onClick={() => handleClick(item.AssAns)}> NEXT </Button></Col>
                </Row>
            </Container>
            ) : (<h2>Chapter Finished! Congratulations!</h2>
            )}
        </Row>
        )}
        <Row style={{ paddingTop: '50px', paddingBottom: '20px' }}>
            <Col>
                <Button variant="secondary" onClick={() => { setCurrentPage(backPage); setQuery(post[0].AssName) }} size="lg"> Go Back </Button>
            </Col>
        </Row>
    </Container>
</ThemeProvider>
);
};

export default OralAssessment