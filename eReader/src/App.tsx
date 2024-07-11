import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/Sidebar/sidebar';
import Eng_DashBoard from './Components/Pages/English_DashBoard';
import Tag_DashBoard from './Components/Pages/Tagalog_DashBoard';
import Eng_Lessons from './Components/Pages/Eng_Lessons';
import Languages from './Components/Pages/Languages';
import Chapter from './Components/Pages/Chapters';
import Less_Question from './Components/Pages/Less_Question';
import Tag_Lessons from './Components/Pages/Tag_Lessons';
import Eng_Assessments from './Components/Pages/Eng_Assessments';
import Tag_Assessments from './Components/Pages/Tag_Assessments';
import OralAssessment from './Components/Pages/OralAssessment';
import backgroundImage from './Components/Images/image.jpg';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
      <Router>
        <aside>
          <Sidebar setCurrentPage={setCurrentPage} sendToggle={toggleSidebar}/>
        </aside>
        <div style={isSidebarOpen ?  ({}):({})}>
            <Routes>
              <Route path="/" element={<Languages/>} />
              <Route path="/Eng_DashBoard" element={<Eng_DashBoard />} />
              <Route path="/Eng_Lessons" element={<Eng_Lessons />} />
              <Route path="/Tag_Dashboard" element={<Tag_DashBoard />} />
              <Route path="/Tag_Lessons" element={<Tag_Lessons />} />
              <Route path="/Chapters" element={<Chapter />} />
              <Route path="/Less_Question" element={<Less_Question />} />
              <Route path="/Eng_Assessments" element={<Eng_Assessments />} />
              <Route path="/Oral_Assessment" element={<OralAssessment />} />
              <Route path="/Tag_Assessments" element={<Tag_Assessments />} />
            </Routes>
          </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
