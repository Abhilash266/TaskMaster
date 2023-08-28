import React from "react";
import axios from 'axios';
import { useState } from "react";



const EditProfile = (props) => {
  const userAccountImage = props.userAccountImage
  

   
  const [image, setImage] = useState(userAccountImage);
  const [filePath, setFilePath] = useState(userAccountImage);
  const [name, setName] = useState(props.name)
  const userAccountId = props.userAccountId
    

   

    // const circleStyle = {
    //   width: "200px",
    //   height: "200px",
    //   borderRadius: "50%", 
    //   backgroundImage: `url(${image})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   cursor:"pointer"
    // }

    
   

    // const userInfoHandler = async(id, name, image) => {
    //   try {
    //     const data = {
    //       Name: name,
    //       Image: image
    //     }
    //     console.log(typeof(image))
        
    //     // const response = await axios.put(`/api/updateUserData/${id}`, data);
    //     // if (response){
    //     //   console.log(response)
    //     // }
    //   } catch (error) {
    //     console.error('Failed to update user data.', error);
    //   } 
    // }
    const handleFileChange = (event) => {
      setImage(event.target.files[0]);
    };
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await axios.post('/upload', formData);
  
        if (response.status === 200) {
            const imagePath = response.data.imagePath
            const newImagePath = imagePath.replace(/\\/g, "/");
            setFilePath(newImagePath)
        } else {
          console.log("Failed")
        }
      } catch (error) {
        console.log(error)
      }
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(image)
        await handleUpload()
        
    }

    
 
   
    



    


    return(
        <>
        <form onSubmit={handleSubmit}>
          {/* <div className="circleContainer" style={circleStyle} >
         
          </div>
          <label>Name:</label><br/>
          <input type="text" id="name" value={name}  onChange={(e)=>{setName(e.target.value)}}></input>
          <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />
            <button type="submit">Save</button> */}
            <div>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload Image</button>
              
              <img src={filePath}></img>
            </div>
          
            
        </form>
        </>
    )
}


export default EditProfile