import React, { useState } from "react";
import "../../Styles/style.css";
import { useFormik } from "formik";
import { TaskFormSchema } from "../../Schemas/formSchema";
import axios from 'axios';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';




const TaskForm = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const type1 = props.type
    const accountName = props.accountName
    const title = props.title
    const [description, setDescription] = useState(props.description)
    const taskDate = props.taskDate
    const priority = props.priority
    
   
    const handleAskQuestion = async () => {
        setIsLoading(true)
        try {
          const response = await axios.post('/api/chatgpt',{prompt: formik.values.Title} );
          await setDescription(response.data)
          formik.values.Description = response.data
        } catch (err) {
          console.log("");
        }
        finally{  
            setIsLoading(false)
        }
      };

    const onSubmit = async(values) => {
        try{
            values.AccountName = accountName
            values.TaskState = "Pending"
            await props.getInfo(values,type1)
        }
        catch(err){
            console.log("")
        }

        
        
    }
    const formik = useFormik({
        initialValues:{
            Title:title,
            Description:description,
            Priority: priority,
            TaskDate:taskDate
        },
        validationSchema: TaskFormSchema,
        onSubmit
        
    })

    const override = css`
    display: block;
    margin: 0 auto;
  `;

    const cancelButtonHandler = () => {
        props.cancelButton(type1)
    }


    return(
        <div className="col-lg-12">
        <div className="createTaskContainer">
        <div className="row">
        {type1 === "Edit" ? <h2 style={{textAlign:"center",marginBottom:"20px"}}>Edit Task</h2> : <h2 style={{textAlign:"center",marginBottom:"20px"}}>Create Task</h2>}
            <div className="col-lg-12 col-md-12">
                <form onSubmit={formik.handleSubmit}>
                    
                        <label>Title:</label><br/>
                        <input type="text" id="Title" value={formik.values.Title}  onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  className={formik.errors.Title && formik.touched.Title? "input-error" : ""}/>
                        {formik.errors.Title && formik.touched.Title && <p className="error">{formik.errors.Title}</p>}
                        <br/>
                        {
                            type1 !== "Edit" && <button className="primaryButton" onClick={handleAskQuestion}>Auto Generate Description</button>
                        }
                        <br/>
                        
                        <label>Description:</label><br/>
                        {isLoading && <BeatLoader css={override} />}
                        <textarea id="Description" value={formik.values.Description} rows="6" cols="40"  onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  className={formik.errors.Description && formik.touched.Description? "input-error" : ""}/>
                        {formik.errors.Description && formik.touched.Description && <p className="error">{formik.errors.Description}</p>}
                        <br/>
                        <label>Priority</label><br/>
                        <select id="Priority" value = {formik.values.Priority} onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}  className={formik.errors.Priority && formik.touched.Priority? "input-error" : ""}>
                            <option value="select an option">Select an Option</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {formik.errors.Priority && formik.touched.Priority && <p className="error">{formik.errors.Priority}</p>}
                        <br/>
                        <label>Date:</label><br/>
                        <input type="date" id="TaskDate" value={formik.values.TaskDate}  onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  className={formik.errors.TaskDate && formik.touched.TaskDate? "input-error" : ""}/>
                        {formik.errors.TaskDate && formik.touched.TaskDate && <p className="error">{formik.errors.TaskDate}</p>}
                        <br/>
                        <div className="row">
                            <button className="primaryButton" type="submit">{type1 === "Edit" ? "Edit Task" : "Add Task"}</button>
                            <button className="primaryButton" onClick={cancelButtonHandler}>Cancel</button>
                        </div>
                        
                </form>
            </div>
        </div>
        </div>
        </div>
    )
}



export default TaskForm;