import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cover from "./cover";
import TaskForm from "./Forms/taskForm";
import "../Styles/style.css"
import Sidebar from "./sidebar";






const Home = (props) => {

    const [data, setData] = useState([])
    
    const [createTaskClicked, setCreateTaskClicked] = useState(false)
    const [editTaskClicked, setEditTaskClicked] = useState(false)
    const [taskListClicked, setTaskListClicked] = useState(true)
    const [dashboardClicked, setDashboardClicked] = useState(false)



    const accountName = props.accountName
    
    const deleteObject = (id) => {
      if (id !== -1) {
        const updatedItems = [...data];
        updatedItems.splice(id, 1);
        setData(updatedItems);
      }
    };
    const putObject = (ind, data) => {
      
      setData((prevData) =>{
        const newObject = [...prevData]
        newObject[ind] = data
        return newObject
      })
    }
    const postObject = (newData) => {
      setData(prevData => [...prevData, newData])
    };

    useEffect(()=>{
      const getHandler = async() => {
        try{
          const userData = await axios.get("/api/getData")
          
          
          userData.data.map((val,ind)=>{
            const value = userData.data[ind]
            setData((data) => [...data, value])
            
          })
                
        }
        catch(err){
          console.error(err)
        }
      }
      getHandler()

    },[])
    

   

    const postHandler = async(formData) => {
      try {
        const data = { results: formData};
       
        const response = await axios.post('/api/postData', data);
        if (response){
          console.log("rendering......")
          formData._id = response.data._id
          console.log(formData)
          console.log("Not here please")
          await postObject(data)
          
          
        }
      } catch (error) {
        console.error('Failed to send data.', error);
      } 
    }

    const putHandler = async(formData) => {
      try {
        const data = {_id:_Id,results: formData}
        const updateId = data._id
        console.log(updateId, data)
        const response = await axios.put(`/api/updateData/${updateId}`, data.results);
        if (response){
          console.log(response)
          await putObject(editId, data)
          
        }
      } catch (error) {
        console.error('Failed to send data.', error);
      } 
    }

    const deleteHandler = async(event) => {
      try{
        const deleteId = data[event.target.dataset.id]._id
        console.log(deleteId)
        await axios.delete(`/api/deleteData/${deleteId}`)
        await deleteObject(event.target.dataset.id)
      }
      catch(err){
        console.log("Not deleted")
      }
    }

  
    const getInfo = async(data,type) => {
      
      if (type === "Edit"){
        await putHandler(data)
        setEditTaskClicked(false)
        setTaskListClicked(true)
        
      }
      else{
        await postHandler(data)
        setCreateTaskClicked(false)
        setTaskListClicked(true)
      }
      
      
    }


    const [_Id, set_Id] = useState()
    const [editId, setEditId] = useState()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [priority, setPriority] = useState()
    const [taskDate, setTaskDate] = useState()
   

    const editHandler = (event) => {
      setEditId(event.target.dataset.id)
      set_Id(data[event.target.dataset.id]._id)
      

      setTitle(data[event.target.dataset.id].results.Title)
      setDescription(data[event.target.dataset.id].results.Description)
      setPriority(data[event.target.dataset.id].results.Priority)
      setTaskDate(data[event.target.dataset.id].results.TaskDate)
      
      setDashboardClicked(false)
      setTaskListClicked(false)
      setCreateTaskClicked(false)
      setEditTaskClicked(true)
    }

    const createButtonHandler = () => {
      setDashboardClicked(false)
      setTaskListClicked(false)
      setCreateTaskClicked(true)
      setEditTaskClicked(false)
      
    }
    const taskListHandler = () => {
      setDashboardClicked(false)
      setTaskListClicked(true)
      setCreateTaskClicked(false)
      setEditTaskClicked(false)
      
    }
    const dashboardHandler = () => {
      setDashboardClicked(true)
      setTaskListClicked(false)
      setCreateTaskClicked(false)
      setEditTaskClicked(false)
    }


    const cancelButtonHandler = (type) => {
        if (type == "Edit"){
          setEditTaskClicked(false)
        }
        else{
          setCreateTaskClicked(false)
        }
        setTaskListClicked(true)
    }

    
    
    
   
    return (
        
        <div className="container-fluid">
            <div className="row">
            
                <div className="col-lg-2 col-md-4 col-sm-12">
                    <Sidebar createButton = {createButtonHandler} taskButton = {taskListHandler} dashboardButton = {dashboardHandler}></Sidebar>
                </div>
              
                {
                    taskListClicked ?
                    <div className="col-lg-10 col-md-8 col-sm-10">
                      <div className="coverContainer">
                    {data.map((item, ind) => (
                        item.results.AccountName === accountName ?
                        <div className="coverStyle" id={ind} key={ind}>
                            <div>
                                <Cover title={item.results.Title} description={item.results.Description} priority={item.results.Priority} taskDate={item.results.TaskDate}></Cover>
                                <button className="btn btn-sm btn-primary" data-id={ind} onClick={editHandler}>Edit</button>
                                <button className="btn btn-sm btn-danger" data-id={ind} onClick={deleteHandler}>Delete</button> 
                            </div>
                        </div>:""
                    ))}
                        <div className="coverStyle" id="newCover" onClick={createButtonHandler}>+</div>
                      </div>
                </div> : ""
                }
                
                {
                    createTaskClicked ?
                    <div className="col-lg-10 col-md-8 col-sm-10">
                      <div className="taskFormContainer">
                        <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} type="Submit"></TaskForm>
                      </div>
                    </div> : ""
                }
                
                {
                  editTaskClicked ?
                  <div className="col-lg-10 col-md-8 col-sm-10">
                    <div className="taskFormContainer">
                      <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} title = {title} description = {description} priority = {priority} taskDate = {taskDate} type="Edit"></TaskForm>
                    </div>
                  </div> : ""
                }
                

                
                {
                  dashboardClicked ?
                  <div className="col-lg-10 col-md-8 col-sm-6">
                    <h3>Welcome to Dashboard</h3>
                  </div> : ""
                }
                

                
            </div>
           
        </div>
        
    )
}


export default Home;