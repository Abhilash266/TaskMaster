import React from "react";
import "../Styles/style.css"





const Sidebar = (props) => {
    const createButtonHandler = () => {
        props.createButton()
    }
    const taskListHandler = () => {
        props.taskButton()
    }
    const dashboardHandler = () => {
        props.dashboardButton()
    }
    
    return(
        <div className="sideBarContainer">
            
            <button className="button1" id="primaryButton" onClick={createButtonHandler}>+Create Task</button>
            <button className="button2" id="primaryButton"onClick={taskListHandler}>Task List</button>
            <button className="button3" id="primaryButton"onClick={dashboardHandler}>Dashboard</button>
            <button className="button4" id="primaryButton">Signout</button>
            
        </div>
    )
}



export default Sidebar