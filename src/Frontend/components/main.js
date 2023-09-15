import React from "react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import { pageStyle } from '../Styles/style';
import { useState, useEffect } from "react";
import "../Styles/style.css";

import MyContext from "../createContext";

import Home from './home';
import Header from "./header";
import Signup from './Forms/signup';
import LoginForm from "./Forms/login";







const Main = () => {
    const isMobile = window.innerWidth <= 800;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signup, setSignUp] = useState(true)
    const [name, setName] = useState("")
    const [userAccountImage, setUserAccountImage] = useState("")
    const [userId, setUserId] = useState("")
    const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("")
    const [emailExistMsg, setEmailExistMsg] = useState("")

    useEffect(()=>{
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('name')
      const image = localStorage.getItem('userImage')
      const userId = localStorage.getItem('userId')
      if (token && name) {
        setIsLoggedIn(true);
        setName(name)
        setUserAccountImage(image)
        setUserId(userId)
      }
    },[])

    const postHandler = async(formData) => {
        try {
          const response = await axios.post('/api/signup', formData);
          return response.data
          
        } catch (error) {
          console.error('Failed to send data.', error);
        } 
      }
    
    const getHandler = async(email, password) => {
        try{
          const userData = await axios.post('/api/login',{
            Email : email,
            Password: password
          })
         
          if(userData.data[0] === true){
            const token = userData.headers.authorization;
            localStorage.setItem('token', token);
            localStorage.setItem('name',userData.data[1])
            localStorage.setItem('userImage',userData.data[2])
            localStorage.setItem('userId',userData.data[3])
            setIsLoggedIn(true)
            setName(userData.data[1])
            setUserAccountImage(userData.data[2])
            setUserId(userData.data[3])
          }
          else{
            return "Invalid Email or Password"
          }
        }
        catch(err){
          console.error(err)
        }
    }
    
    const getInfo = async(data,type) => {
        if (type === "Signup"){
            const res = await postHandler(data)
            if(res != false){
              setSignUp(false)
            }
            else{
              setEmailExistMsg("Email Already Exists")
            }
            
  
        }
        else{
          const invalidMessage = await getHandler(data.Email, data.Password)
          setInvalidPasswordMsg(invalidMessage)
        }
    }

    const logoutClicked = () => {
      setIsLoggedIn(false)
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('userId');
      localStorage.removeItem('userImage');
      setName("")
      setUserId("")
      setUserAccountImage("")
      document.body.style.backgroundColor = "#6D9AC4";
    }

  

    return(
        <>
        {
          isMobile ? 
          <div className={`mobile-message ${isMobile ? '' : 'hidden'}`}>
              <h3 style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center",textAlign:"center"}}>Please open this site on a larger screen for better experience.</h3>
          </div>
          
          :
        
        <div style={pageStyle}>
          <MyContext.Provider value={isLoggedIn}>
          <Header name={name} userAccountImage ={userAccountImage} click={logoutClicked} ></Header>
          </MyContext.Provider>
            
        {
            isLoggedIn ? 
            <>
            

    
            <Home userAccountImage ={userAccountImage} accountName={name} userAccountId = {userId} click={logoutClicked}></Home>
           
            </>
             : 
            <>
            {
              signup ? 
              <div className="signupContainer">
                <div>
                  <Signup getInfo = {getInfo} msg={emailExistMsg}></Signup> 
                </div>
                
                <div>
                  <button className="anchorStyle" onClick={()=>{
                      setSignUp(false)
                  }}>Already have an account?</button>
                  
                </div>
                
              </div>
            
              : 
              <div className="signupContainer">
              <LoginForm getInfo = {getInfo} msg = {invalidPasswordMsg}></LoginForm>
              <button className="anchorStyle" onClick={()=>{
                setSignUp(true)
            }}>Go back to signup</button>
              </div>
            }
            
            
            </>
            
            
        }
        
        
        </div>
        }
        </>
    )
}



export default Main