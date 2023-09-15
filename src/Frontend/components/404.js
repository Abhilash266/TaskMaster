import React from "react";
import "../Styles/style.css";
import errorPage from "../Images/404.png";



const PageNotFound = () => {
    return(
        
		<div class="errorImage-container">
        	<img className="errorImg" src={errorPage} alt="Full Screen Image" />		
		</div>
		

    )}



export default PageNotFound
