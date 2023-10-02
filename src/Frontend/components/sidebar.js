import React, { useState } from "react";
import "../Styles/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPencilAlt, faTasks, faHome, faCog, faSignOutAlt, faToggleOn, faToggleOff, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';








const Sidebar = (props) => {
    const isMobile = window.innerWidth <= 899;
    const [isActive, setIsActive] = useState(true)
    const [selectedButton, setSelectedButton] = useState("button3");
    const themeToggle = props.themeToggle
    
    const toggleSidebar = () => {
        setIsActive(!isActive);
        props.handleToggleBar()
      };
    
    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    const createButtonHandler = () => {
        props.createButton()
        handleButtonClick("button2")
    }
    const taskListHandler = () => {
        props.taskButton()
        handleButtonClick("button3")
    }
    const dashboardHandler = () => {
        props.dashboardButton()
        handleButtonClick("button4")
    }

    const settingHandler = () => {
        props.settingButton()
        handleButtonClick("button5")
    }
    const toggleHandler = () => {
        props.toggleHandler()
    }

    const signOutHandler = () => {
        props.click()
    }
    
    return(
        <div className={`${isActive ? `${themeToggle ? 'sideBarContainerActiveLight' : 'sideBarContainerActive'}` : `${themeToggle ? 'sideBarContainerLight' : 'sideBarContainer'}`}`}>
            { !isMobile &&
                <button className="button1" id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} 
            onClick={toggleSidebar}>
            {
                isActive ? <FontAwesomeIcon className="icon" icon={faArrowRight} /> : <FontAwesomeIcon className="icon" icon={faArrowLeft} />
            }
            
            </button>}
            <button className={selectedButton == "button2" ? `${themeToggle ? 'selectedButtonLight' : 'selectedButton'}` : "button2"} id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={createButtonHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faPencilAlt} /> : "Create Task"}
            </button>
            
            <button className={selectedButton == "button3" ? `${themeToggle ? 'selectedButtonLight' : 'selectedButton'}` : "button3"} id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={taskListHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faTasks} /> : "Task List"}
            </button>
            
            <button className={selectedButton == "button4" ? `${themeToggle ? 'selectedButtonLight' : 'selectedButton'}` : "button4"} id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={dashboardHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faHome}/> : "Dashboard"}
            </button>
            <button className={selectedButton == "button5" ? `${themeToggle ? 'selectedButtonLight' : 'selectedButton'}` : "button5"} id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={settingHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faCog}/> : "Settings"}
            </button>
            
           
            <button className="button7" id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={toggleHandler}>
                {themeToggle ? <FontAwesomeIcon className="icon" icon={faMoon}/> : <FontAwesomeIcon className="icon" icon={faSun}/>}
            </button>

            <button className={`button6${isActive ? 'active' : ''}`} id={`${themeToggle ? 'primaryButtonLight' : 'primaryButton'}`} onClick={signOutHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faSignOutAlt}/> : "Signout"}
            </button>
            
            
        </div>
    )
}



export default Sidebar