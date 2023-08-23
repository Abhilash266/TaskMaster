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
import { Route, Router} from "react-router";
import { redirect } from "react-router";







const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signup, setSignUp] = useState(true)
    const [name, setName] = useState("")
    const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("")
   
    useEffect(()=>{
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('name')
      if (token && name) {
        setIsLoggedIn(true);
        setName(name)
      }
    },[])

    const postHandler = async(formData) => {
        try {
          const response = await axios.post('/api/signup', formData);
          if (response){
            console.log("rendering......") 
          }
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
            setIsLoggedIn(true)
            setName(userData.data[1])
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
            await postHandler(data)
            setSignUp(false)
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
      setName("")
    }

  

    return(
        <>
        <div style={pageStyle}>
          <MyContext.Provider value={isLoggedIn}>
          <Header name={name} click={logoutClicked} ></Header>
          </MyContext.Provider>
            
        {
            isLoggedIn ? 
            <>
            

            
            <Home accountName={name}></Home>
            </>
             : 
            <>
            {
              signup ? 
              <div className="signupContainer">
                <div>
                  <Signup getInfo = {getInfo}></Signup> 
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
        </>
    )
}



export default Main