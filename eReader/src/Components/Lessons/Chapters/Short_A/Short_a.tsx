import { Container } from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Vid from '../../../Videos/ShortVowels.mp4'

const Short_a = ({setCurrentPage}) => {
    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{padding: '20px'}}>
                <Row>
                    <Col>
                        <h1>Short 'a'</h1>
                        Word Awareness, Syllable Blending, Syllable Counting, Rhyme.
                    </Col>
                </Row>
                <Row style={{paddingTop: '20px'}}>
                    <Col md="auto">
                            <video width="850" height="500" controls>
                                <source src={Vid} type="video/mp4" />
                            </video>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button variant="secondary" style={{}} onClick={() => setCurrentPage("Lesson1")} size="lg"> Go Back </Button>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Short_a;