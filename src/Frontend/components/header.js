import React from "react";
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
      }
    
  
    return(
        <div className="container-fluid" id="header"> 
            <header className="headerStyle">
                    { props.name ? 
                        <div className="thumbnailTextContainer">
                            <div className="circleContainer" style={circleStyle}></div>
                            <h3 style={{marginLeft:"0.5em"}}>Welcome {props.name}</h3>
                        </div> : <h3>Task Master</h3> }
                
                    <div className="logoutContainer">
                        { value && <h3 onClick={props.click} style={{cursor:"pointer"}}>Logout</h3>}
                    </div>
            </header>
        </div>
    )
}





export default Header;