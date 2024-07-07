import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilScreenDesktop, cilBook, cilPencil, cilHamburgerMenu, cilX} from '@coreui/icons';

import './sidebar.css'; // Import CSS file for styling

const Sidebar = ({setCurrentPage,sendToggle}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [lessonsOpen, setLessonOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        <li onClick={() => setCurrentPage('Languages')}><CIcon icon={cilScreenDesktop} style={{width: '45px', height: '45px'}}/>  DASHBOARD</li>
        <li onClick={() => setCurrentPage('Eng_DashBoard')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilScreenDesktop} style={{width: '35px', height: '35px'}}/>  English</li>
        <li onClick={() => setCurrentPage('Tag_DashBoard')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilScreenDesktop} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
        <li onClick={() => setLessonOpen(!lessonsOpen)}><CIcon icon={cilBook} style={{width: '45px', height: '45px'}}/> LESSONS</li>
        {lessonsOpen && 
          <>
            <li onClick={() => setCurrentPage('Eng_Lessons')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilBook} style={{width: '35px', height: '35px'}}/>  English</li>
            <li onClick={() => setCurrentPage('Tag_Lessons')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilBook} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
          </>
        }
        <li onClick={() => setAssessmentOpen(!assessmentOpen)}><CIcon icon={cilPencil} style={{width: '45px', height: '45px'}}/> ASSESSMENT</li>
        {assessmentOpen && 
          <>
            <li onClick={() => setCurrentPage('Eng_Assessment')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilPencil} style={{width: '35px', height: '35px'}}/>  English</li>
            <li onClick={() => setCurrentPage('Tag_Assessment')} style={{fontSize: '35px', marginLeft: '40px'}}><CIcon icon={cilPencil} style={{width: '35px', height: '35px'}}/>  Tagalog</li>
          </>
        }
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
