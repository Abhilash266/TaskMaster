import React, { useState } from "react";


const Cover = (props) => {
    
    const stateStyle = {
        float: "right",
        background:"#fff",
        color:"#000",
        fontSize:"10px",
        borderRadius:"8px",
        padding:"2px"
        
    }

  
    return (
        <>
        
            <p style={stateStyle}>Pending</p>
            <p style={stateStyle}>{props.priority}</p>
            <h5>{props.title}</h5>
            <h5>{props.description}</h5>
            <h5>{props.taskDate}</h5>
            

        </>
    )
}


export default Cover;