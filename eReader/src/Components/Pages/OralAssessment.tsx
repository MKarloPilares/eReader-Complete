import { useState, useEffect } from "react";
import RecAudio from '../Images/RecordedAudio.png'
import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ThemeProvider} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import './Less_Questions.css';

const OralAssessment = () => {
  const location = useLocation();
  const { AssName } = location.state || {};
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
          AssName: AssName,
        };
      
        try {
          const response = await fetch('http://localhost:8000/assessment_questions', {
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
    <body>
    {post.map((item: any, index: number) =>
    <div>
      
              <div className="pane">
                <div className="container">
                <div>
                  <div className="header"> 
                  <div>
                    <h3>English Lesson / {AssName}</h3>
                    <h1>{item.AssName}</h1>
                  </div>
                  </div>
                <div className="container-quest">
            {indexCheck-1 == index ? (
            <div>
              <div>
                        <h2>{item.Quest} <Image src={RecAudio} onClick={() => start(item.AssAud.data)} rounded style={{ height: '50px', width:'60px' }}></Image></h2> 
                </div>
                    <div>
                        {item && item.AssImg ? (
                            <Image src={loadImage(item.AssImg.data)} style={{width: "1180px", height: "500px"}}></Image>
                        ) : (
                            <div>No Image available</div> // Fallback if video is not available
                        )}
                        <Button variant="success" size="lg" style={{position: 'relative', left: '38%'}} onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}>
                             {isListening ? "STOP RECORDING" : "RECORD"} </Button>
                        <p></p>
                        <h3 style={item.AssAns === recognizedText ? ({color: 'green'}) : (recognizedText !== '' ? ({color: 'red'}) : 
                            ({visibility: 'hidden'}))}>{item.AssAns === recognizedText ? ("CORRECT! GOOD JOB!") : ("TRY AGAIN! YOU CAN DO IT!")}</h3>
                          <div style={{margin: "20px"}}>
                  <Button variant="success" size="lg" onClick={() => setIndexCheck(indexCheck-1)}> BACK </Button>
                  <Button variant="success" size="lg" onClick={() => handleClick(item.AssAns)}> NEXT </Button>                
                        </div>
                </div>
                </div>
            ) : (<h2>Chapter Finished! Congratulations!</h2>
            )}
            </div>
            </div>
            </div>
            </div>
            </div>
        )}

    </body>
</ThemeProvider>
);
};

export default OralAssessment;