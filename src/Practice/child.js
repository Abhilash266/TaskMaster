import React from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useState } from "react";




const Child = forwardRef((props,ref) => {

    const [toggle, setToggle] = useState(true)

    useImperativeHandle(ref, ()=>({
        alterToggle(){
            setToggle(!toggle)
        }
    }))

    const clickHandler = () => {
        setToggle(!toggle)
    }

    return(
        <>
        <button onClick={clickHandler}>Toggle</button>
        {
            toggle? "Switch On" : "Switch Off"
        }
        </>
    )
})



export default Child