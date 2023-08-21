import React from "react";
import MyContext from "../createContext";
import "../Styles/style.css"
import { useContext } from "react";
import "../Images/logo.png"




const Header = (props) => {
    const value = useContext(MyContext)


  
    return(
        <>
        <header className="headerStyle">
            <div className="headerContainer">
        
            {
                
                props.name ? 
                <div>
                <h4>Welcome {props.name}</h4>
                </div>
                : <h1>My Website</h1>
                
            }
            <div className="circularContainer">
                <img src="../Images/logo.png" alt="Circular Image"/>
            </div>

            {
                value ? 
                <div>
                <h4 onClick={props.click}>Logout</h4> 
                </div>
              
                : ""
            }
            
            
            </div>
        </header>
        </>

    )
}





export default Header;