import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cover from "./cover";
import TaskForm from "./Forms/taskForm";
import "../Styles/style.css"
import Sidebar from "./sidebar";
import EditProfile from "./Forms/editProfile";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";





const Home = (props) => {

    const [data, setData] = useState([])
    
    const [createTaskClicked, setCreateTaskClicked] = useState(false)
    const [editTaskClicked, setEditTaskClicked] = useState(false)
    const [taskListClicked, setTaskListClicked] = useState(true)
    const [dashboardClicked, setDashboardClicked] = useState(false)
    const [settingClicked, setSettingClicked] = useState(false)

    const [currentTasks, setCurrentTasks] = useState()
    const [completedtasks, setCompletedTasks] = useState()
    

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

    const putHandler = async(taskData, index) => {
      try {
        const id = data[index]._id
        const finalData = await {_id:id,results: taskData}
        const updateId = id
        console.log(taskData,id)
        
        const response = await axios.put(`/api/updateData/${updateId}`, finalData.results);
        if (response){
          console.log(response)
          await putObject(index, finalData)
          
        }
      } catch (error) {
        console.error('Failed to send data.', error);
      } 
    }

    const deleteHandler = async(ind) => {
      try{
        const deleteId = data[ind]._id
        console.log(deleteId)
        await axios.delete(`/api/deleteData/${deleteId}`)
        await deleteObject(ind)
      }
      catch(err){
        console.log("Not deleted")
      }
    }

  
    const getInfo = async(data,type) => {
      
      if (type === "Edit"){
        console.log(data)
        await putHandler(data, editId)
        setEditTaskClicked(false)
        setTaskListClicked(true)
        
      }
      else{
        await postHandler(data)
        setCreateTaskClicked(false)
        setTaskListClicked(true)
      }
      
      
    }


    
    const [editId, setEditId] = useState()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [priority, setPriority] = useState()
    const [taskDate, setTaskDate] = useState()
    
   

    const editHandler = (ind) => {
      setEditId(ind)
      
      setTitle(data[ind].results.Title)
      setDescription(data[ind].results.Description)
      setPriority(data[ind].results.Priority)
      setTaskDate(data[ind].results.TaskDate)
      
      
      setDashboardClicked(false)
      setTaskListClicked(false)
      setCreateTaskClicked(false)
      setEditTaskClicked(true)
      setSettingClicked(false)
    }

    const createButtonHandler = () => {
      setDashboardClicked(false)
      setTaskListClicked(false)
      setCreateTaskClicked(true)
      setEditTaskClicked(false)
      setSettingClicked(false)
      
    }
    const taskListHandler = () => {
      setDashboardClicked(false)
      setTaskListClicked(true)
      setCreateTaskClicked(false)
      setEditTaskClicked(false)
      setSettingClicked(false)
      
    }
    const dashboardHandler = () => {
      setDashboardClicked(true)
      setTaskListClicked(false)
      setCreateTaskClicked(false)
      setEditTaskClicked(false)
      setSettingClicked(false)
    }

    const settingHandler = () => {
      setSettingClicked(true)
      setDashboardClicked(false)
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

    const taskStateChanged = async(tState,ind) => {
      
      const copiedArray = data[ind].results
      copiedArray.TaskState = tState
      await putHandler(copiedArray, ind)
     
    }
    const [toggleBar, setToggleBar] = useState(false)
    const handleToggleBar = () => {
      setToggleBar(!toggleBar)
    }

    

  const handleDragEnd = (result) => {
    const ind = result.source.index
    if(result.source.droppableId == result.destination.droppableId){
      console.log("no")
      return
    }
    else{
      if (data[ind].results.TaskState === "Pending"){
        taskStateChanged("Completed",ind)
      }
      else{
        taskStateChanged("Pending",ind)
      }
    }
    
  };

   
    return (
        
        <div className="container-fluid">
            <div className="row">
            
                <div className={`${toggleBar ? 'col-lg-1 col-md-1 col-sm-3' : 'col-lg-2 col-md-2 col-sm-4'}`} id="mainBar">
                    <Sidebar createButton = {createButtonHandler} taskButton = {taskListHandler} settingButton = {settingHandler} 
                    dashboardButton = {dashboardHandler} handleToggleBar = {handleToggleBar} ></Sidebar>
                </div>
              
                {
                    taskListClicked &&
                    <div className={`${toggleBar ? 'col-lg-11 col-md-11 col-sm-9' : 'col-lg-10 col-md-10 col-sm-8'}`} id="mainBar">
                      <div className="coverContainer">
                    {data.map((item, ind) => (
                        item.results.AccountName === accountName ?
                        <div className="coverStyle" id={ind} key={ind}>
                            <div>
                                <Cover index={ind} title={item.results.Title} description={item.results.Description} 
                                priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                editHandler={editHandler} deleteHandler={deleteHandler}></Cover>
                            </div>
                        </div>:""
                    ))}
                        <div className="coverStyle" id="newCover" onClick={createButtonHandler}>+</div>
                      </div>
                </div> 
                }
                
                {
                    createTaskClicked &&
                    <div className="col-lg-10 col-md-10 col-sm-8" id="taskFormContainer">
                      <div className="taskFormContainer">
                        <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} type="Submit"></TaskForm>
                      </div>
                    </div> 
                }
                
                {
                  editTaskClicked &&
                  <div className="col-lg-10 col-md-10 col-sm-8" id="taskFormContainer">
                    <div className="taskFormContainer" >
                      <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} title = {title} description = {description} priority = {priority} taskDate = {taskDate} type="Edit"></TaskForm>
                    </div>
                  </div> 
                }
                

                
                {
                  dashboardClicked &&
                  <div className="col-lg-10 col-md-10 col-sm-8">
                    
                    <div className="coverContainerDashboard">
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <div className="col-lg-5 col-md-4 col-sm-3">
                        
                        <Droppable droppableId="1">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                    {data.map((item, ind) => (
                                      item.results.TaskState === "Pending" &&
                                      <Draggable draggableId={`${ind}`} key={ind} index={ind}>
                                          {(provided, snapshot) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                                              <div className="coverStyle1" id={ind} key={ind}>
                                                  <div>
                                                      <Cover index={ind} title={item.results.Title} description={item.results.Description} 
                                                      priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                                      taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                                      editHandler={editHandler} deleteHandler={deleteHandler}></Cover>
                                                  </div>
                                              </div>
                                              
                                              {provided.placeholder}
                                            </div>
                                          )}
                                      </Draggable>
                                      ))}

                          </div>
                          )}
                        </Droppable>
                      </div>


                      
                      <div className="col-lg-5 col-md-4 col-sm-3">
                      
                      <div className="completedtaskContainer">
                      
                        <Droppable droppableId="2">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                    {data.map((item, ind) => (
                                      item.results.TaskState === "Completed" &&
                                      <Draggable draggableId={`${ind}`} key={ind} index={ind}>
                                          {(provided, snapshot) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                                              <div className="coverStyle1" id={ind} key={ind}>
                                                  <div>
                                                      <Cover index={ind} title={item.results.Title} description={item.results.Description} 
                                                      priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                                      taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                                      editHandler={editHandler} deleteHandler={deleteHandler}></Cover>
                                                  </div>
                                              </div>
                                              
                                              {provided.placeholder}
                                            </div>
                                          )}
                                      </Draggable>
                                      ))}

                          </div>
                          )}
                        </Droppable>
                        </div>
                      </div>






                      </DragDropContext>
                   
                      
                    </div>
                      
                  </div>
                }

                {
                  settingClicked &&
                  <div className="col-lg-10 col-md-10 col-sm-8">
                    <div >
                    <EditProfile name = {props.accountName} userAccountImage = {props.userAccountImage} userAccountId = {props.userAccountId}></EditProfile>
                    </div>
                  </div> 
                }
                

                
            </div>
          
        </div>
        
        
    )
    
}


export default Home;