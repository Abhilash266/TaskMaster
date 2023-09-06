import React from "react";
import axios from 'axios';
import { useState, useRef } from "react";
import "../../Styles/style.css";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';



const EditProfile = (props) => {
  const userAccountImage = props.userAccountImage
  
  
   
  const [image, setImage] = useState(userAccountImage);
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userAccountId = props.userAccountId
    
  const getNewImage = async() => {
        const newImage = await axios.get(`/api/getUserData/${userAccountId}`)
        setImage(newImage)
  }
   

    const circleStyle = {
      width: "500px",
      height: "500px",
      borderRadius: "50%", 
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor:"pointer",
      border: "2px solid #333"
    }

    
   

    const handleUpload = async (event) => {
      setIsUploaded(true)
      const file = event.target.files[0];
      if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    };

    const saveUpload = async(data) => {
      try{
          await axios.put(`/api/updateUserData/${userAccountId}`,data)
      }
      catch(err){
          console.log("")
      }
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        setIsLoading(true)
        const data = {
          Image: image
        }
        try{
          await saveUpload(data)
          await getNewImage
          localStorage.setItem("userImage",JSON.stringify(image))
        }
        catch(err){
          console.log("")
        }
        finally{
          setIsUploaded(false)
          await setTimeout(() => {
            window.location.reload();
            setIsLoading(false)
          }, 2000);
          
        }
  
        
    }

    const override = css`
  display: block;
  margin: 0 auto;
`;
 
  
    const imageInputRef = useRef(null);
    const openImageUploader = () => {
      imageInputRef.current.click();
    };


  


    return(
        <>
        <form onSubmit={handleSubmit}>
        <h2 style={{textAlign:"center"}}>Change Profile Image</h2>
          <div className="circleContainer" style={circleStyle} onClick={openImageUploader} id="imageUploadContainer">
            <div className="overlay">
              <h2>UPLOAD IMAGE</h2>
              
            </div>
              <input  type="file" accept="image/*" ref={imageInputRef} style={{display:"none",cursor:"pointer",zIndex:"999"}} onChange={handleUpload} />
          </div>
         
          
           
            <div style={{textAlign:"center"}}>
              {
                isUploaded && <button id="primaryButton" type="submit">Save</button>
              }
              {isLoading && <BeatLoader css={override} />}
            </div>
          
            
        </form>
        </>
    )
}


export default EditProfile