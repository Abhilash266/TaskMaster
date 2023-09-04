import React from "react";
import "../../Styles/style.css"
import { useFormik } from "formik";
import { SignupSchema } from "../../Schemas/formSchema";
import userAccountImage from "../../../Backend/Images/img5.avif"
import { useState } from "react";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const Signup = (props) => {
    
    const [isLoading, setIsLoading] = useState(false)
    
    const onSubmit = async(values, actions) => {
        setIsLoading(true)
        try{
            values.Image = {userAccountImage}
            await props.getInfo(values,"Signup")
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
        
        
    };
    const override = css`
    display: block;
    margin: 0 auto;
  `;

    const formik = useFormik({
        initialValues:{
            Name:"",
            Email:"",
            Password:""
        },
        validationSchema: SignupSchema,
        onSubmit
    })

    return(
        <div className="signupStyle"> 
        <form  onSubmit={formik.handleSubmit}>
            <h3 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Sign Up</h3>
            <label>Name:</label><br/>
            <input type="text" id="Name" value={formik.values.Name} onChange={formik.handleChange} 
            onBlur={formik.handleBlur} className={formik.errors.Name && formik.touched.Name? "input-error" : ""}/>
            {formik.errors.Name && formik.touched.Name && <p className="error">{formik.errors.Name}</p>}
            <br />
            <label>Email:</label><br/>
            <input type="email" id="Email" value={formik.values.Email} onChange={formik.handleChange} 
            onBlur={formik.handleBlur} className={formik.errors.Email && formik.touched.Email? "input-error" : ""}/>
            {formik.errors.Email && formik.touched.Email && <p className="error">{formik.errors.Email}</p>}
            <br />
            <label>Password:</label><br/>
            <input type="password" id="Password" value={formik.values.Password} onChange={formik.handleChange} 
            onBlur={formik.handleBlur} className={formik.errors.Password && formik.touched.Password? "input-error" : ""}/>
            {formik.errors.Password && formik.touched.Password && <p className="error">{formik.errors.Password}</p>}
            <br />
            <button className="primaryButton" type="submit">Sign Up</button>
            {props.msg ? <p className="error">{props.msg}</p> : ""}
            {isLoading && <BeatLoader css={override} />}
        </form>
        </div>
    )
}




export default Signup;