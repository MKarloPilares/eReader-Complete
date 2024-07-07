import { Container } from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import shortAvid from '../../../Videos/Short A.mp4';
import audio from '../../../Audio/Oral1.m4a';
import RecAudio from '../../../Images/RecordedAudio.png';
import {Image} from "react-bootstrap";
import {Stack} from 'react-bootstrap';

const Less_Question = ({setCurrentPage}) => {
    const test = ['1', '2'];
    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{padding: '20px'}}>
                <Row style={{paddingTop: '55px', paddingBottom: '20px'}}>
                    <Col>
                        Short 'a'/Let Me Sound it Out
                        <h1>Short 'a'</h1>
                        Word Awareness, Syllable Blending, Syllable Counting, Rhyme.
                    </Col>
                </Row>
                <Row>
                    <Container fluid style={{border: '1px solid black'}}> 
                        <Row>
                            <Col class="col-md-10"> 
                            <h2>Direction: Read it loud and record your voice using the 
                            flashcards that shows on your screen. <Image src={RecAudio} onClick={() => start(6)} rounded style={{height: '50px', width:'60px'}}></Image></h2> 
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <video width="1180" height="500" controls>
                                    <source src={shortAvid} type="video/mp4" />
                                </video>
                            </Col>
                        </Row>
                        <Row className='justify-content-center' style={{padding: '20px'}}>
                            <Col md="auto">
                                <audio src={audio} controls></audio>
                            </Col>
                        </Row>
                        <Row className='justify-content-center' style={{padding: '20px'}}>
                            <Col md="auto">
                                <Button variant="primary" style={{}} size="lg"> RECORD </Button>
                            </Col>
                            <Col md="auto">
                                <Button variant="secondary" style={{}} size="lg"> RETAKE </Button>
                            </Col>
                        </Row>
                        <Row className='justify-content-end' style={{padding: '20px'}}>
                            <Col md="auto"><Button variant="primary" style={{}} size="lg"> SUBMIT </Button></Col>
                        </Row>
                    </Container>
                </Row>
                <Row style={{paddingTop: '50px', paddingBottom: '20px'}}>
                    <Col>
                    <Button variant="secondary" style={{}} onClick={() => setCurrentPage("Short_a")} size="lg"> Go Back </Button>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Less_Question;