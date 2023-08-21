import React, { useRef } from "react";
import Child from "./child";






const Practice = () => {
    const buttonRef = useRef(null)
    const buttonHandler = () => {
        buttonRef.current.alterToggle()
    }
    

    
    return(
        <>
        <button onClick={buttonHandler}>parent Toggle</button>
        <Child ref={buttonRef}></Child>
        
        
            
        
        </>
    )
}




export default Practice