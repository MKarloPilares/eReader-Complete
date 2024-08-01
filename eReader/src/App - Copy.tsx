import {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import Sidebar from './Components/Sidebar/sidebar';
import Eng_DashBoard from './Components/Pages/English_DashBoard';
import Tag_DashBoard from './Components/Pages/Tagalog_DashBoard';
import Languages from './Components/Pages/Languages';
import Eng_Assessment from './Components/Pages/Eng_Assessments';
import Tag_Assessment from './Components/Pages/Tag_Assessments';
import OralAssessment from './Components/Pages/OralAssessment';
import CMS from './Components/Pages/CMS';
import Eng_Lessons from './Components/Pages/Eng_Lessons';
import Tag_Lessons from './Components/Pages/Tag_Lessons';
import Chapter from './Components/Pages/Chapters';
import Less_Question from './Components/Pages/Less_Question';


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [LessName, setLessName] = useState('');
  const [LessDesc, setLessDesc] = useState('');
  const [ChapName, setChapName] = useState('');
  const [currentPage, setCurrentPage] = useState('CMS');
  const [Query, setQuery] = useState('')
  const [backPage, setBackPage] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <Container fluid>
          <Sidebar setCurrentPage={setCurrentPage} sendToggle={toggleSidebar}/>
        </Container>
        <body style={{overflow: 'auto', boxSizing: 'border-box', display: '-ms-flexbox', position: 'relative', padding: '0', margin: '0', width: '100vw', bottom: '0px'}}>
        <Container style={isSidebarOpen ?  ({ padding: '50px', position: 'relative', left: '150px'}) : ({padding: '50px'})}>
            <Row>
                <Col>
                  {currentPage === 'Eng_DashBoard' && <Eng_DashBoard setCurrentPage={setCurrentPage}/>}
                  {currentPage === 'Tag_DashBoard' && <Tag_DashBoard setCurrentPage={setCurrentPage}/>}
                  {currentPage === 'Languages' && <Languages setCurrentPage={setCurrentPage}/>}
                  {currentPage === 'Eng_Assessment' && <Eng_Assessment setCurrentPage={setCurrentPage} setQuery={setQuery} setBackPage={setBackPage}/>}
                  {currentPage === 'Tag_Assessment' && <Tag_Assessment setCurrentPage={setCurrentPage} setQuery={setQuery} setBackPage={setBackPage}/>}
                  {currentPage === 'Eng_Lessons' && <Eng_Lessons setCurrentPage={setCurrentPage} setQuery={setQuery} setLessName={setLessName} setLessDesc={setLessDesc}/>}
                  {currentPage === 'Tag_Lessons' && <Tag_Lessons setCurrentPage={setCurrentPage} setQuery={setQuery}/>}
                  {currentPage === 'Chapters' && <Chapter setCurrentPage={setCurrentPage} Query={Query} LessName={LessName} LessDesc={LessDesc} setChapName={setChapName}/>}
                  {currentPage === 'Less_Question' && <Less_Question setCurrentPage={setCurrentPage} LessName={LessName} LessDesc={LessDesc} ChapName={ChapName} setQuery={setQuery} />}
                  {currentPage === 'OralAssessment' && <OralAssessment setCurrentPage={setCurrentPage} Query={Query} setQuery={setQuery} backPage={backPage}/>}
                  {currentPage === 'CMS' && <CMS/>}
              </Col>
            </Row>
          </Container>
        </body>
    </ThemeProvider>
  );
};

export default App;