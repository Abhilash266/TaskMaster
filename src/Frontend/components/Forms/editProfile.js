import React from "react";
import { useState } from "react";



const EditProfile = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
    };


    return(
        <>
        <form >
        <label>Name:</label><br/>
        <input></input>
        <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h4>Selected Image Preview:</h4>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        </div>
      )}
            

        
        </form>
        </>
    )
}


export default EditProfile