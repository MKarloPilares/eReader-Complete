import { Container } from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Stack} from 'react-bootstrap';
import shortAvid from '../../../Videos/Short Vowel (A).mp4'

const Short_a_SIOS = ({setCurrentPage}) => {
    const test = ['1', '2'];
    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{padding: '20px'}}>
                <Row>
                    <Col>
                        <h1>Short 'a'</h1>
                        Word Awareness, Syllable Blending, Syllable Counting, Rhyme.
                    </Col>
                </Row>
                <Row style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <Col md="auto">
                            <video width="1180" height="540" controls>
                                <source src={shortAvid} type="video/mp4" />
                            </video>
                    </Col>
                </Row>
                <Row style={{paddingTop: '20px'}}>
                    <Col>
                    <Button variant="secondary" onClick={() => setCurrentPage("Short_a")} size="lg"> Go Back </Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button variant="primary" size="lg" disabled> Take Quiz </Button>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Short_a_SIOS;