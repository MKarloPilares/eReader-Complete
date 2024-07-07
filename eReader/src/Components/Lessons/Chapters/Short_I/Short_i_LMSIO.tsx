import { Container } from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import shortIvid from '../../../Videos/Short I.mp4'
import audio from '../../../Audio/Oral1.m4a'
const Short_i_LMSIO = ({setCurrentPage}) => {
    const test = ['1', '2'];
    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{padding: '20px'}}>
                <Row style={{paddingTop: '55px', paddingBottom: '20px'}}>
                    <Col>
                        Short 'i'/Let Me Sound it Out
                        <h1>Short 'i'</h1>
                        Word Awareness, Syllable Blending, Syllable Counting, Rhyme.
                    </Col>
                </Row>
                <Row>
                    <Container style={{width: '1670px',height: '600px', border: '1px solid black'}}> 
                        <Row>
                            <Col class="col-md-10"> 
                            <h2>Direction: Read it loud and record your voice using the 
                            flashcards that shows on your screen.</h2> 
                            </Col>
                        </Row>
                        <Row>
                            <Col md="auto">
                                <video width="750" height="400" controls>
                                    <source src={shortIvid} type="video/mp4" />
                                </video>
                            </Col>

                            <Col>
                                <audio src={audio} controls></audio>
                                <Button variant="primary" style={{}} size="lg"> RECORD </Button>
                                <Button variant="secondary" style={{}} size="lg"> RETAKE </Button>
                            </Col>
                        </Row>
                        <Row className='justify-content-end'>
                            <Col md="auto"><Button variant="primary" style={{}} size="lg"> SUBMIT </Button></Col>
                        </Row>
                    </Container>
                </Row>
                <Row style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <Col>
                    <Button variant="secondary" style={{}} onClick={() => setCurrentPage("Short_i")} size="lg"> Go Back </Button>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Short_i_LMSIO;