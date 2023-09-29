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

    const [themeToggle, setThemeToggle] = useState(false)
    

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
          formData._id = response.data._id
          await postObject(data)
        }
      } catch (error) {
        console.error("");
      } 
    }

    const putHandler = async(taskData, index) => {
      try {
        const id = data[index]._id
        const finalData = await {_id:id,results: taskData}
        const updateId = id
        
        
        const response = await axios.put(`/api/updateData/${updateId}`, finalData.results);
        if (response){
          await putObject(index, finalData)
        }
      } catch (error) {
        console.error("");
      } 
    }

    const deleteHandler = async(ind) => {
      try{
        const deleteId = data[ind]._id
        await axios.delete(`/api/deleteData/${deleteId}`)
        await deleteObject(ind)
      }
      catch(err){
        console.log("")
      }
    }

  
    const getInfo = async(data,type) => {
      
      if (type === "Edit"){
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

  const toggleHandler = () => {
    setThemeToggle(!themeToggle)
    if(themeToggle){
      document.body.style.backgroundColor = "#6D9AC4";
    }
    else{
      document.body.style.backgroundColor = "#fff";
    }
    
  }

  const checkDataLength = () => {
    var len = 0
    for(let i = 0; i < data.length; i++){
      if(data[i].results.AccountName == accountName){
          len += 1
      }
    }
    return len
  }

   
    return (
        
        <div className="container-fluid">
            <div className="row">
            
                <div className={`${toggleBar ? 'col-lg-2 col-md-2 col-sm-2' : 'col-lg-1 col-md-2 col-sm-2'}`} id="mainBar">
                    <Sidebar createButton = {createButtonHandler} taskButton = {taskListHandler} settingButton = {settingHandler} 
                    dashboardButton = {dashboardHandler} toggleHandler = {toggleHandler} themeToggle = {themeToggle} 
                    handleToggleBar = {handleToggleBar} click={props.click} checkLength = {checkDataLength} ></Sidebar>
                </div>
                
              
                {
                    taskListClicked &&
                    
                    <div className={`${toggleBar ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-10 col-sm-10'}`} id="mainBar">
                      <div className={`${themeToggle ? 'coverContainerLight' : 'coverContainer'}`}>
                      {checkDataLength() == 0 ? <h3 style={{marginTop:"10px"}}>Create your first task</h3> :
                    data.map((item, ind) => (
                        item.results.AccountName === accountName &&
                        <div className={`${themeToggle ? 'coverStyleLight' : 'coverStyle'}`} id={ind} key={ind}>
                            <div>
                                <Cover index={ind} title={item.results.Title} description={item.results.Description} 
                                priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                editHandler={editHandler} deleteHandler={deleteHandler} themeToggle = {themeToggle}></Cover>
                            </div>
                        </div>
                    ))
                      }
                      {/* {
                        checkDataLength() != 0 && <div className={`${themeToggle ? 'coverStyleLight' : 'coverStyle'}`} id={`${themeToggle ? 'newCoverLight' : 'newCover'}`} onClick={createButtonHandler}>
                          <h3>Create New Task</h3>
                          </div>
                      } */}
                        
                      </div>
                </div>
                }
                
                {
                    createTaskClicked &&
                    <div className={`${toggleBar ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-10 col-sm-10'}`} id="taskFormContainer">
                      <div className={`${themeToggle ? 'taskFormContainerLight' : 'taskFormContainer'}`}>
                        <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} type="Submit"></TaskForm>
                        
                      </div>
                    </div> 
                }
                
                {
                  editTaskClicked &&
                  <div className={`${toggleBar ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-10 col-sm-10'}`} id="taskFormContainer">
                    <div className={`${themeToggle ? 'taskFormContainerLight' : 'taskFormContainer'}`} >
                      <TaskForm accountName={accountName} getInfo = {getInfo} cancelButton = {cancelButtonHandler} title = {title} description = {description} priority = {priority} taskDate = {taskDate} type="Edit"></TaskForm>
                    </div>
                  </div> 
                }
                

                
                {
                  dashboardClicked &&
                  <div className={`${toggleBar ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-10 col-sm-10'}`} id="dashboardContainer">
                    <div className="row">
                    
                    {checkDataLength() == 0 ? 
                    
                    <div className={`${themeToggle ? 'noTaskContainerLight' : 'noTaskContainer'}`}><h3 style={{marginTop:"10px"}}>You are yet to create a task</h3>
                    </div> 
                    :
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <div className={`${toggleBar ? 'col-lg-6 col-md-6 col-sm-3' : 'col-lg-6 col-md-6 col-sm-3'}`}>
                        <div className={`${themeToggle ? 'pendingTasksContainerLight' : 'pendingTasksContainer'}`}>
                        <h3 style={{textAlign:"center"}}>Pending Tasks</h3>
                        <Droppable droppableId="1">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                    {data.map((item, ind) => (
                                      item.results.TaskState === "Pending" && item.results.AccountName === accountName &&
                                      <Draggable draggableId={`${ind}`} key={ind} index={ind}>
                                          {(provided, snapshot) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                                              <div className={`${themeToggle ? 'coverStyle1Light' : 'coverStyle1'}`} id={ind} key={ind}>
                                                  <div>
                                                      <Cover index={ind} themeToggle = {themeToggle} title={item.results.Title}  
                                                      priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                                      taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                                      editHandler={editHandler} deleteHandler={deleteHandler} container={"Dashboard"}></Cover>
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


                      
                      <div className={`${toggleBar ? 'col-lg-6 col-md-6 col-sm-3' : 'col-lg-6 col-md-6 col-sm-3'}`}>
                      
                      
                      <div className={`${themeToggle ? 'completedTasksContainerLight' : 'completedTasksContainer'}`}>
                      <h3 style={{textAlign:"center"}}>Completed Tasks</h3>
                        <Droppable droppableId="2">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                    {data.map((item, ind) => (
                                      item.results.TaskState === "Completed" && item.results.AccountName === accountName &&
                                      <Draggable draggableId={`${ind}`} key={ind} index={ind}>
                                          {(provided, snapshot) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                                              <div className={`${themeToggle ? 'coverStyle1Light' : 'coverStyle1'}`} id={ind} key={ind}>
                                                  <div>
                                                      <Cover index={ind} title={item.results.Title} 
                                                      priority={item.results.Priority} taskDate={item.results.TaskDate} 
                                                      taskState = {item.results.TaskState} taskStateChanged = {taskStateChanged}
                                                      editHandler={editHandler} deleteHandler={deleteHandler} themeToggle = {themeToggle}></Cover>
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






                      </DragDropContext>}
                   </div>
                      
                    
                  
                  </div>
                }

                {
                  settingClicked &&
                  <div className={`${toggleBar ? 'col-lg-10 col-md-10 col-sm-10' : 'col-lg-11 col-md-10 col-sm-10'}`} id="settingsContainer">
                    <div className={`${themeToggle ? 'settingsContainerLight' : 'settingsContainer'}`}>
                    <EditProfile name = {props.accountName} userAccountImage = {props.userAccountImage} userAccountId = {props.userAccountId}></EditProfile>
                    </div>
                  </div> 
                }
                

                
            </div>
          
        </div>
        
        
    )
    
}


export default Home;