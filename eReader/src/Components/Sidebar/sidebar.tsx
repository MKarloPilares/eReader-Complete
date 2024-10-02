import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilScreenDesktop, cilBook, cilPencil, cilHamburgerMenu, cilX} from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

import './sidebar.css'; // Import CSS file for styling

const Sidebar = ({sendToggle}) => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [lessonsOpen, setLessonOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const goToPage = (page) => {
    navigate(page);
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
    <div>
      <button style={{backgroundColor: 'transparent'}} className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={() => {toggleSidebar(); sendToggle(isOpen)}}>
      <CIcon icon={cilHamburgerMenu} style={{width: '52px', height: '38px', color: '#228a22'}}/>
    </button>
    </div>
    <div id='s' className={`sidebar ${isOpen ? 'open' : ''}`} >
      <button style={{backgroundColor: 'transparent'}} className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={() => {toggleSidebar(); sendToggle(isOpen)}}>
        <CIcon icon={cilX} style={{position: 'absolute', left: '30px', top: '20px', width: '52px', height: '38px', color: 'white'}}/>
      </button>
      <ul className="sidebar-menu">
        <li onClick={() => goToPage('')}><CIcon icon={cilScreenDesktop} style={{width: '45px', height: '45px'}}/>  DASHBOARD</li>
        <li onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Eng_DashBoard')}} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilScreenDesktop} style={{width: '35px', height: '35px'}}/>  English</li>
        <li  onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Tag_DashBoard')}} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilScreenDesktop} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
        <li onClick={() => setLessonOpen(!lessonsOpen)}><CIcon icon={cilBook} style={{width: '45px', height: '45px'}}/> LESSONS</li>
        {lessonsOpen && 
          <>
            <li  onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Eng_Lessons')}} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilBook} style={{width: '35px', height: '35px'}}/>  English</li>
            <li  onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Tag_Lessons')}}  style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilBook} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
          </>
        }
        <li onClick={() => setAssessmentOpen(!assessmentOpen)}><CIcon icon={cilPencil} style={{width: '45px', height: '45px'}}/> ASSESSMENT</li>
        {assessmentOpen && 
          <>
            <li onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Eng_Assessments')}} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilPencil} style={{width: '35px', height: '35px'}}/>  English</li>
            <li onClick={() => {toggleSidebar(); sendToggle(isOpen); goToPage('/Tag_Assessments')}} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilPencil} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
          </>
        }
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
