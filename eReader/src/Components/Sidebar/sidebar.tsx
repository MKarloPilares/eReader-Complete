import { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilScreenDesktop, cilBook, cilPencil, cilHamburgerMenu, cilX} from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import ereaderlogo from "../Images/e-reader_Logo.svg" ;

import './sidebar.css'; // Import CSS file for styling

const Sidebar = () => {
  let navigate = useNavigate();
  const [lessonsOpen, setLessonOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const goToPage = (page) => {
    navigate(page);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="d-flex">
        <button  className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={() => {toggleSidebar(); sendToggle(isOpen)}}>
          <CIcon className="icon" icon={cilHamburgerMenu}/>
        </button>
        <div className="sidebar-logo">
          <img className="logo" src={ereaderlogo} alt="E-Reader Logo" />
        </div>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a className="sidebar-link" onClick={() => setDashboardOpen(!dashboardOpen)}>
            <CIcon className="icon" icon={cilScreenDesktop}/>
            <span>DASHBOARD</span>
          </a>
        </li>
        {dashboardOpen &&
          <>
            <li className="sidebar-item" >
              <a className="sidebar-link" onClick={() => goToPage('/Eng_DashBoard')} style={{ marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilScreenDesktop} style={{width: '20px', height: 'auto'}}/>
                <span>English</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => goToPage('/Tag_DashBoard')} style={{ marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilScreenDesktop} style={{width: '20px', height: 'auto'}}/>
                <span>Tagalog</span>
              </a>
            </li>
          </>
        }
        <li className="sidebar-item">
          <a className="sidebar-link" onClick={() => setLessonOpen(!lessonsOpen)}>
            <CIcon className="icon" icon={cilBook}/>
            <span>LESSONS</span>
          </a>
        </li>
        {lessonsOpen && 
          <>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => goToPage('/Eng_Lessons')} style={{marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilBook} style={{width: '20px', height: 'auto'}}/>
                <span>English</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => goToPage('/Tag_Lessons')}  style={{ marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilBook} style={{width: '20px', height: 'auto'}}/>
                <span>Tagalog</span>
              </a>
            </li>
          </>
        }
        <li className="sidebar-item">
          <a className="sidebar-link" onClick={() => setAssessmentOpen(!assessmentOpen)}>
            <CIcon className="icon" icon={cilPencil}/>
            <span>ASSESSMENT</span>
          </a>
        </li>
        {assessmentOpen && 
          <>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => goToPage('/Eng_Assessments')} style={{ marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilPencil} style={{width: '20px', height: 'auto'}}/>
                <span>English</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" onClick={() => goToPage('/Tag_Assessments')} style={{ marginLeft: '40px'}}>
                <CIcon className="icon" icon={cilPencil} style={{width: '20px', height: 'auto'}}/>
                <span>Tagalog</span>
              </a>
            </li>
          </>
        }
      </ul>
      <div className="sidebar-footer">
        <a href='/' className="sidebar-link"><CIcon icon={cilX}/></a>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
