import React, { useState } from "react";


const Cover = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [taskState, setTaskState] = useState(props.taskState)
    
    const stateStyle = {
        float: "right",
        background:"#fff",
        color:"#000",
        fontSize:"10px",
        borderRadius:"8px",
        padding:"2px 10px 2px 10px",
        backgroundColor: taskState == "Pending" ? '#FFC48D' : '#9BE4FF'
    }
    
    const handleCheck = () => {
        setIsChecked(!isChecked)
    }
    const handleDone = async() => {
        
        await setTaskState("Completed")
        await setIsChecked(false)
        props.taskStateChanged("Completed",props.index)
        
       
    }

    const handleUndo = async() => {
        
        await setTaskState("Pending")
        await setIsChecked(false)
        props.taskStateChanged("Pending",props.index)
        
    }

    const editHandler = () => {
        props.editHandler(props.index)
    }

    const deleteHandler = () => {
        props.deleteHandler(props.index)
    }

    const priorityStyle = {
        float: "right",
        background:"#fff",
        color:"#000",
        fontSize:"10px",
        borderRadius:"8px",
        padding:"2px 10px 2px 10px",
        backgroundColor: props.priority == "low" ? '#9EFF9B' : props.priority == "medium" ? "#FFF89B" : "#FF6E6E"
       
    };
   
  
    return (
        
        <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-5">
                    <input type="checkbox" checked={isChecked} onChange={handleCheck}></input>
                </div>
                <div className="col-lg-7">
                    <p style={stateStyle}>{taskState}</p>
                    <p style={priorityStyle}>{props.priority}</p>
                </div>
            </div>

            <div className="row">
                
                <div className="col-lg-4">
                    <h5>{props.taskDate}</h5>
                </div>
                
                
                <div className="col-lg-8">
                <div style={{borderLeft:"2px solid white", paddingLeft:"10px"}}>
                    <h5>{props.title}</h5>
                    <h6>{props.description}</h6>
                
         
                {
                    isChecked && taskState == "Pending" &&
                    <button className="btn btn-sm btn-success" onClick={handleDone}>Task Completed</button>
                } 

                {
                    isChecked && taskState == "Completed" &&
                    <button className="btn btn-sm btn-success" onClick={handleUndo}>Reopen Task</button>
                }

                { 
                    isChecked && taskState == "Pending" &&
                    <>
                        <button className="btn btn-sm btn-primary" onClick={editHandler}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={deleteHandler}>Delete</button> 
                    </>

                }
                </div>
                </div>
            </div>
        </div>
            
    )
}


export default Cover;