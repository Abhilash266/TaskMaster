import React, { useState } from "react";
import "../Styles/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPencilAlt, faTasks, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';






const Sidebar = (props) => {

    const [isActive, setIsActive] = useState(false)

    const toggleSidebar = () => {
        setIsActive(!isActive);
        props.handleToggleBar()
      };

    const createButtonHandler = () => {
        props.createButton()
    }
    const taskListHandler = () => {
        props.taskButton()
    }
    const dashboardHandler = () => {
        props.dashboardButton()
    }

    const settingHandler = () => {
        props.settingButton()
    }
    
    return(
        <div className={`sideBarContainer ${isActive ? 'active' : ''}`}>
            <button className="button1" id="primaryButton" onClick={toggleSidebar}>
            {isActive ? <FontAwesomeIcon className="icon" icon={faArrowRight} /> : <FontAwesomeIcon className="icon" icon={faArrowLeft} />}
            </button>
            <button className="button2" id="primaryButton" onClick={createButtonHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faPencilAlt} /> : "Create Task"}
            </button>
            <button className="button3" id="primaryButton" onClick={taskListHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faTasks} /> : "Task List"}
            </button>
            <button className="button4" id="primaryButton" onClick={dashboardHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faHome}/> : "Dashboard"}
            </button>
            <button className="button5" id="primaryButton" onClick={settingHandler}>
                {isActive ? <FontAwesomeIcon className="icon" icon={faCog}/> : "Settings"}
            </button>
            <button className={`button6${isActive ? 'active' : ''}`} id="primaryButton">
                {isActive ? <FontAwesomeIcon className="icon" icon={faSignOutAlt}/> : "Signout"}
            </button>
            
        </div>
    )
}



export default Sidebar