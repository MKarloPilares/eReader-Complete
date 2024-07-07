import { Container } from 'react-bootstrap';
import {ThemeProvider} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Stack} from 'react-bootstrap';

const Short_a_AF = ({setCurrentPage}) => {
    const test = ['1', '2'];
    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
            <Container fluid="sm" style={{padding: '20px'}}>
                <Row>
                    <Col>
                        <h1 style={{fontWeight: 'bolder'}}>Short 'a'</h1>
                        Word Awareness, Syllable Blending, Syllable Counting, Rhyme.
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <Stack gap={35}>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" size="lg">Sound it Out Slowly</Button>
                                <Button variant="secondary" size="lg">Sound it Out Quickly</Button>
                                <Button variant="secondary" size="lg">Let Me Sound it Out</Button>
                                <Button variant="primary" size="lg">Audio Flashcards</Button>
                                <Button variant="secondary" size="lg">Silent Flashcards</Button>
                                <Button variant="secondary" size="lg">Take the Quiz</Button>
                            </div>
                        </Stack>
                    </Col>
                    <Col md="auto">
                        <Container style={{width: '650px',height: '300px', border: '1px solid black'}}></Container>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    );
};

export default Short_a_AF;