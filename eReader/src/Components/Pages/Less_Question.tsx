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
import './Less_Questions.css';

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
            <body>
              <div className="pane">
                <div className="container">
                  <div className="header">
                    <h3>English Lesson / {ChapName}</h3>
                    <h1>{ChapName}</h1>
                    <p className="subHead">{LessDesc}</p>
                  </div>
                <div className="container-quest">
                {post.map((item: any, index: number) => 
                <div>
                    
                    {indexCheck-1 == index ? (
                    <div>
                    <div>
                        <h2>Direction: Read it loud and record your voice using the flashcards that shows on your screen. <Image src={RecAudio} rounded style={{ height: '50px', width:'60px' }}></Image></h2>
                    </div>  
                    <div>
                        {item && item.QuestCard ? (
                            <Image src={loadObject(item.QuestCard.data, "data:image/png;base64")} style={{width: "600px", height: "auto"}}></Image>
                        ) : (
                            <div>No video available</div> // Fallback if video is not available
                            
                        )}
                        <Button className="toggle-btn"><Image src={RecAudio} onClick={() => start(item.QuestAud.data)} rounded style={{height: '50px', width:'60px'}}/></Button>
                            <Button className="toggle-btn" variant="primary" size="lg" onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}>
                            {isListening ? "STOP RECORDING" : "RECORD"} </Button>
                            <p></p>
                            <h3 style={item.QuestAns === recognizedText ? ({color: 'green'}) : (recognizedText !== '' ? ({color: 'red'}) : 
                                ({visibility: 'hidden'}))}>{item.QuestAns === recognizedText ? ("CORRECT! GOOD JOB!") : ("TRY AGAIN! YOU CAN DO IT!")}</h3>
                            
                            <div style={{margin: "20px"}}>
                            <Button variant="primary" size="lg" onClick={() => setIndexCheck(indexCheck-1)}> BACK </Button>
                            <Button variant="primary" style={{position: "relative", float: "right"}}size="lg" onClick={() => setIndexCheck(indexCheck+1)}> NEXT </Button>
                            </div>
                    </div>
                    </div>
                    ) : (<h2>Chapter Finished! Congratulations!</h2>
                    )}
                </div>
                )}
                </div>
                               
                    </div>
                </div>
            </body>
        </ThemeProvider>
    );
};

export default Less_Question;
