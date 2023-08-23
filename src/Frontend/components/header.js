import React, { useState } from "react";
import MyContext from "../createContext";
import "../Styles/style.css"
import { useContext } from "react";
import "../Images/logo.png"




const Header = (props) => {
    const value = useContext(MyContext)
    const [isOpen, setIsOpen] = useState(false);
    
  
    return(
        <>
        <header className="headerStyle">
        
        
            {
                
                props.name ? 
                <>
               
                
                <h4 style={{float:"left"}}>Welcome {props.name}</h4>
               
               
                </>
                
                : <h1>My Website</h1>
                
            }
                    

            {
                value ? 
                
                <h4 style={{float:"right"}} onClick={props.click}>Logout</h4> 
                
              
                : ""
            }

             
            
            
            
        </header>
        </>

    )
}





export default Header;