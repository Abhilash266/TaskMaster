import React from "react";
import "../../Styles/style.css"
import { useFormik } from "formik";
import { LoginSchema } from "../../Schemas/formSchema";


const LoginForm = (props) => {

    const onSubmit = async(values,actions) => {  
        await props.getInfo(values,"Login")
        actions.resetForm()
    };
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
            
        </form>
        </div>
    )
}




export default LoginForm;