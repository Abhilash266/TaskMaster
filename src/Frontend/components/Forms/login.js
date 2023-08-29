import React, { useEffect } from "react";
import "../../Styles/style.css"
import { useFormik } from "formik";
import { LoginSchema } from "../../Schemas/formSchema";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { useState } from "react";


const LoginForm = (props) => {
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async(values,actions) => {  
        setIsLoading(true)
        try{
            await props.getInfo(values,"Login")
        actions.resetForm()
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
            Email:"",
            Password:""
        },
        validationSchema: LoginSchema,
        onSubmit
    })
    
    
    return(
        <div className="signupStyle">
        <form onSubmit={formik.handleSubmit}>
            <h3 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Login</h3>
            <label>Email:</label><br/>
            <input type="email" id="Email" value={formik.values.Email} onChange={formik.handleChange}
            onBlur={formik.handleBlur} className={formik.errors.Email && formik.touched.Email? "input-error" : ""}/>
            {formik.errors.Email && formik.touched.Email && <p className="error">{formik.errors.Email}</p>}
            <br />
            <label>Password:</label><br/>
            <input type="password" id="Password" value={formik.values.Password} onChange={formik.handleChange}
            onBlur={formik.handleBlur} className={formik.errors.Password && formik.touched.Password? "input-error" : ""}/>
            {formik.errors.Password && formik.touched.Password && <p className="error">{formik.errors.Password}</p>}
            {props.msg ? <p className="error">{props.msg}</p> : ""}
            <br />
            
            
            <button className="primaryButton" type="submit">Login</button>
            {isLoading && <BeatLoader css={override} />}
            
        </form>
        </div>
    )
}




export default LoginForm;