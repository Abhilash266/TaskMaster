import React, { useState } from "react";
import "../Styles/style.css";


const Cover = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [taskState, setTaskState] = useState(props.taskState)
    
    const day = props.taskDate.split("-")
   
    const month = day[1]
    const year = day[0]
    const themeToggle = props.themeToggle
    const monthText = {
        "01":"Jan", "02":"Feb", "03":"Mar", "04":"Apr", "05":"May",
        "06":"Jun", "07":"July", "08":"Aug", "09":"Sept", "10":"Oct",
        "11":"Nov","12":"Dec",
    }
    
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
                
                <div className="col-lg-3">
                    <div className="row">
                        <div col-lg-12>
                            <h5>{month}-{monthText[month]}</h5>
                        </div>
                        <div col-lg-12>
                        <h5>{year}</h5>
                        </div>
                    </div>
                    
                </div>
                
                
                <div className="col-lg-9">
                <div className={`${themeToggle ? 'coverInfoLight' : 'coverInfo'}`}>
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