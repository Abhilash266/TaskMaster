import React, { useState } from "react";
import "../Styles/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPencilAlt, faTasks, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';






const Sidebar = (props) => {

    const [isActive, setIsActive] = useState(false)
    const [selectedButton, setSelectedButton] = useState("button3");

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
    
    return(
        <div className={`sideBarContainer ${isActive ? 'active' : ''}`}>
            <button className="button1" id="primaryButton" 
            onClick={toggleSidebar}>
            {isActive ? <FontAwesomeIcon className="icon" icon={faArrowRight} /> : <FontAwesomeIcon className="icon" icon={faArrowLeft} />}
            </button>
            <button className={selectedButton == "button2" ? "selectedButton" : "button2"} id="primaryButton" onClick={createButtonHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faPencilAlt} /> : "Create Task"}
            </button>
            <button className={selectedButton == "button3" ? "selectedButton" : "button3"} id="primaryButton" onClick={taskListHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faTasks} /> : "Task List"}
            </button>
            <button className={selectedButton == "button4" ? "selectedButton" : "button4"} id="primaryButton" onClick={dashboardHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faHome}/> : "Dashboard"}
            </button>
            <button className={selectedButton == "button5" ? "selectedButton" : "button5"} id="primaryButton" onClick={settingHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faCog}/> : "Settings"}
            </button>
            <button className={`button6${isActive ? 'active' : ''}`} id="primaryButton">
                {isActive ? <FontAwesomeIcon className="icon" icon={faSignOutAlt}/> : "Signout"}
            </button>
            
        </div>
    )
}



export default Sidebar