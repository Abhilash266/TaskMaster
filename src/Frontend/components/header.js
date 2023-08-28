import React, { useState } from "react";
import MyContext from "../createContext";
import "../Styles/style.css"
import { useContext } from "react";





const Header = (props) => {
    const value = useContext(MyContext)
    const image = props.userAccountImage

    const circleStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "50%", 
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor:"pointer"
      }
    
  
    return(
        <>
        <div className="container-fluid" id="header">
            
            <header className="headerStyle">

            <div className="row">
                <div className="col-lg-6">
                    { props.name ? 
                    <div className="row">
                        <div className="col-lg-1">
                            <div className="circleContainer" style={circleStyle} >

                            </div>
                            
                        </div>
                        <div className="col-lg-5">
                            <h3>Welcome {props.name}</h3>
                        </div>
                    </div>
                    
                    : <h3>My Website</h3> }
                </div>
                <div className="col-lg-6" id="logout">
                    { value && <h3 onClick={props.click}>Logout</h3>}
                </div>
            </div>
        
            </header>

            </div>
        
        
        </>

    )
}





export default Header;