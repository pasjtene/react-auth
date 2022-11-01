import React, { ChangeEvent,useRef, FC, SyntheticEvent, useEffect, useState } from "react";
import { ITask } from "./taskinterface";
import TodoTask from "./TodoTask";
import { useThemeContext } from "../context/ThemeContext";
import axios from "axios";
import Cookies from "js-cookie";


import { Authuser, useAuthuser } from "../../user/UserContext";
import AppService from "../../services/AppService";
 
const LOCAL_TASKS_URL = "http://localhost:8086/api/user/tasks";
const TASKS_URL = "http://51.68.196.188:8080/talodu/api/user/tasks";

const SAVE_LOCAL_TASKS_URL = "http://localhost:8086/api/user/addtask";

const Task = (props:any) => {
const [taskName, setTaskName] = useState<string>("")
const [deadLine, setDeadLine] = useState<number>(0);

const [editTaskName, setEditTaskName] = useState<string>("")
const [editTaskId, setEditTaskId] = useState<number>(0)
const [savedTaskName, setSavedtaskName] = useState<string>("")
const [editTaskdeadLine, setEditTaskDeadLine] = useState<number>(0);
const [isTaskDone, setTaskDone] = useState<boolean>(false);

const [isEditTaskDone, setEditTaskDone] = useState<string>("");



const [todoList, setTodoList] = useState<ITask[]>([])
const [doneList, setDoneList] = useState<ITask[]>([])
const [taskToDel, setTaskToDel] = useState<ITask[]>([])

const [istaskSet, setTaskSet] = useState(false)
const [user, setUser] = useState({} as Authuser)
const [user2, setUser2] = useState({})

const[taskid, setTaskId] = useState(0)
const[taskids, setTaskIds] = useState<number[]>([])
const theme = useThemeContext()

const closemodal = useRef<HTMLButtonElement>(null);

axios.defaults.withCredentials = true;

const authUser = useAuthuser();
const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length

useEffect(()=>{
    if(authUser.user?.firstName?.length) setUser(authUser.user) 
    if(props.user?.firstName?.length) setUser(props.user) 

    
})



useEffect(()=> {

    //this gets the user, who is set at login, and app on refresh
    const utask = Cookies.get("utasks")
    const auth_user = Cookies.get("utasks")


    if (auth_user) {
      const  dparsed = JSON.parse(auth_user)
      const t = JSON.stringify(dparsed.user)
      setUser(dparsed)
        //console.log("The user tasks from cookies...", JSON.parse(JSON.stringify(Cookies.get("utasks"))))
        console.log("The user 3 tasks from cookies...", JSON.parse(auth_user))
        console.log("The user id from cookies...", Cookies.get("uid"))
        

        const userTask = JSON.stringify(user.tasks)
        if(userTask) {
            const juserTask = JSON.parse(userTask)
            console.log("The user tasks are..123 ",juserTask)
            //setTodoList([...todoList, ...juserTask])
            
            console.log("The todo list is...1999", todoList)
        }
        
    } 

    if(authUser.user?.firstName?.length) setUser(authUser.user) 
    if(props.user?.firstName?.length) setUser(props.user) 

    //following only runs when the user exists.
    // it does not run on page reload
    //We can get the user id / email / tasks from cookie
    //or we can send a new request to get the user via jwt
    //if(props.user?.email?.length)
    if(user?.email?.length)
    try {
        const usertasks = axios.post(AppService.app_url("/api/user/tasks"), user.email || authUser.user?.email,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });

           usertasks.then((response) => {
                console.log("The user tasks ", JSON.parse(JSON.stringify(response.data.data)) )

                const dt = JSON.parse(JSON.stringify(response.data.data.tasks))

                //dt.forEach(addTask3)

                //addTask2(dt)
                setTodoList([...todoList, ...dt])
                //setTodoList[...todoList, ...response.data.data.tasks ]
           })

    } catch(err) {
        console.log("Got error gettings task ", err)
    }


    // componentWillUnmount
  return () => {
    console.log("Did you save your tasks before leaving ?????")
 }
     
},[user.firstName])


const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    if(e.target.name=="taskname") {
        setTaskName(e.target.value)
    } else {
        setDeadLine(Number(e.target.value))
    }
    
}



const addTaskToDel = (ttd:ITask):void => {

    //We only add a tast to the list of tasks to delete if it does not exist
    //using task id would be better
    let taskExist: boolean = false
    if(taskToDel.length != 0) {
        console.log(taskToDel.length)
        taskToDel.forEach((t:ITask)=> {
            if(t.name === ttd.name) {
                console.log("it exist")
                taskExist = true
                
            } 
        } ) 
    } else {
        setTaskToDel([...taskToDel,ttd])
    }

   if(!taskExist) {
    setTaskToDel([...taskToDel,ttd])
   }

}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min:number , max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addTask = ():void => {
/*
   const td = props?.user?.tasks.map((e:ITask)=>{
    setTodoList([...todoList, e])
    })

        const td2 = props?.user?.tasks.map((e:ITask)=>{
            if(td.length>todoList.length)
            todoList.push(e)
        })
    */
    const newTask =  {
        //id: getRandomInt(1,1000),
        id: todoList.length+1,
        name: taskName,
        deadLine: deadLine,
        completed: isTaskDone
    }

    user.tasks.push(newTask)

    //reset values
    setTodoList([...todoList, newTask])
    setTaskName("")
    setDeadLine(0)

    setTaskId(todoList.length+1)


    const newTask2 =  {
        name: taskName,
        deadLine: deadLine,
        user: user  
    }

    if(user?.email?.length)
    {
        try {
            const usertasks = axios.post(AppService.app_url("/api/user/addtask")+"/"+user.email , newTask2,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               });
    
               usertasks.then((response) => {
                    const dt = JSON.parse(JSON.stringify(response.data.data.tasks))
               })
    
        } catch(err) {
            console.log("Got error gettings task ", err)
        }
    } else {
        console.log("Cannot save task to back end")
    }    
}



useEffect(()=>{
    console.log("The is..",taskid)
},[taskid])


const editTask = (t:ITask):void => {

    //const [editTaskId, setEditTaskId] = useState<number>(0)
    setEditTaskId(t.id)
    setSavedtaskName(t.name)
    setEditTaskName(t.name)
    setEditTaskDeadLine(t.deadLine)
    setTaskDone(t.completed)

    console.log("Task done? " ,t.completed)
    t.completed?setEditTaskDone("Yes"):setEditTaskDone("No")
    
}

const handleTaskCompleted = (e:SyntheticEvent,id:string)=> {
    
    setEditTaskDone(id)
    if(id==="No") {
        setTaskDone(false)
    } else {
        setTaskDone(true)
    }
    

  }

const handleTaskEdit = (e:ChangeEvent<HTMLInputElement>):void => {
    if(e.target.name=="taskname") {
        setEditTaskName(e.target.value)
    } 

    if(e.target.name=="deadline") {
        setEditTaskDeadLine(Number(e.target.value))
    } 

    if(e.target.name=="btnradio") {
        console.log("The radio..", e.target)
        //setEditTaskDeadLine(Number(e.target.value))
    }

    
  
}

const saveEditedTask = () => {

   // const [editTaskName, setEditTaskName] = useState<string>("")
   // const [editTaskId, setEditTaskId] = useState<number>(0)
    //const [savedTaskName, setSavedtaskName] = useState<string>("")
    //const [editTaskdeadLine, setEditTaskDeadLine] = useState<number>(0);
    //const [isTaskDone, setTaskDone] = useState<boolean>(false);
    
    //const [isEditTaskDone, setEditTaskDone] = useState<string>("");


    const editTask =  {
        id: editTaskId,
        name: editTaskName,
        deadLine: editTaskdeadLine,
        completed: isEditTaskDone=="Yes"?true:false
    }

    user.tasks.filter((t)=>{
        if(t.id == editTaskId ){
            t.name = editTaskName
            t.deadLine = editTaskdeadLine
            t.completed = isEditTaskDone=="Yes"?true:false
        }
    })

    //This is just to for the re-render, which shows the updated task...
    setTaskId(getRandomInt(1,10000))

    try {
        const usertasks = axios.post(AppService.app_url("/api/user/updatetask") , editTask,
            {
                 headers: { 'Content-Type': 'application/json'}
         
           });

           usertasks.then((response) => {
                //const dt = JSON.parse(JSON.stringify(response.data.data.task))
                console.log(response.data)
                user.tasks.filter((t)=>{
                    if(t.id == response.data.id) {
                        t=response.data.id
                    }
                })
                setTaskId(response.data.id)
                closemodal?.current?.click();
           })

    } catch(err) {
        console.log("Got error gettings task ", err)
    }




}


const completeTask2 = (taskToComplete: ITask):void => {
    //setTodoList(todoList.filter((task)=> task.name != taskToComplete.name))

    console.log("The todo list le ..", todoList.length)

    user.tasks.filter((t:ITask)=> {
        if(t.name == taskToComplete.name) {
            t.completed =true;
            //setTodoList([...todoList])
        }
    } )



    todoList.filter((t:ITask)=> {
        if(t.name == taskToComplete.name) {
            t.completed =true;
            setTodoList([...todoList])
        }
    } )

    //because the auth users task is directly rendered in some instances
    //When the task is complete, this needs to be set
    authUser.user?.tasks.filter((t:ITask)=>{
        if(t.name == taskToComplete.name) {
            t.completed =true;
            //setTodoList([...todoList])
        }
    })

   
    
    const newTask =  {
        id: getRandomInt(1,1000),
        name: taskToComplete.name,
        deadLine: taskToComplete.deadLine,
        completed: true
    }

    setDoneList([...doneList, newTask])

    const newTask2 =  {
        id: taskToComplete.id,
        name: taskToComplete.name,
        deadLine: taskToComplete.deadLine,
        completed: true
    }

    {
        try {
            const usertasks = axios.post(AppService.app_url("/api/user/updatetask") , newTask2,
                {
                     headers: { 'Content-Type': 'application/json'}
             
               });
    
               usertasks.then((response) => {
                    //const dt = JSON.parse(JSON.stringify(response.data.data.task))
                    console.log(response.data)
               })
    
        } catch(err) {
            console.log("Got error gettings task ", err)
        }
    }   
  
}

const completeTask = (taskNameToDelete: string):void => {
    setTodoList(todoList.filter((task)=> task.name != taskNameToDelete))

}

    return (
        <div>
                        { isUserAuth()?
                <div className="task-wrapper">
                    <div className="header-wrapper" style={{...theme.theme?.primary}}>
                        
                    <div className="header">
                        <div className="inputContainer">
                        <input type="text" placeholder="Task... " name="taskname" value={taskName}
                        onChange={handleChange} />
                        <input type="number" placeholder="Deadline (in days)..." name="deadline" value={deadLine}
                        onChange={handleChange}/>
                        </div>
                        <button onClick={addTask}>Add Task</button>
                    </div>
                    </div>
                
                    <div className="todoList" style={{...theme.theme?.secondary}}>
                        
                        <div>User: {props.user?.firstName} </div>

                        <div className="col-4" style={{fontSize:"40px", ...theme.theme?.primary}}>
                            {props.user?.firstName || authUser.user?.firstName}  
                            {props.user?.lastName || authUser.user?.lastName} 
                        </div>

                        <div>
                          User from cookie 2:  {user?.firstName}  {user?.lastName}
                          { user?.tasks?.length?
                        <div>
                             From user cookie task  
                            {user.tasks.map((task:ITask, key:number)=>{
                            
                                return !task.completed&&<TodoTask task={task} key={key} 
                                            completeTask2={completeTask2}
                                            editTask= {editTask}
                                            />
                                
                            })
                            }
                        </div>:null
                        }
                        </div>    
                        </div>

                        
                
                        
                          Task completed from User from cookie 2: 
                          { user?.tasks?.length?
                            <div className="todoList" style={{...theme.theme?.secondary}}>
                                Completed tasks from cookies
                                {user.tasks.map((task:ITask, key:number)=>{
                                    return task.completed&&
                                
                                    <div key={key}>
                                        
                                        <TodoTask task={task} completeTask2={completeTask2} editTask={editTask}/>
                                        <button type="button" onClick={()=>addTaskToDel(task)} className="btn btn-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal">
                                            Delete this task
                                        </button>
                                    
                                    </div>
                                    
                                })}
                                
                            </div>:null
                            }

                        <div className="modal fade" id="edittask" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Editing task {savedTaskName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                

                                <div>
                                        <main className="form-signin form-signin-size w-100 m-auto">
                                            <form >
                                                <h1 className="h3 mb-3 fw-normal">Enter new task details</h1>
                                                <div className="form-floating">
                                                <input type="text" className="form-control"
                                                        name="taskname" value={editTaskName}  
                                                        
                                                    onChange={handleTaskEdit}
                                                />
                                                <label className="floatingInput">Task name</label>
                                                </div>
                                                <div className="form-floating">
                                                <input type="number" className="form-control" 
                                                name="deadline" 
                                                value={editTaskdeadLine}
                                                    onChange={handleTaskEdit}
                                                />
                                                 <label className="floatingInput">Task deadline</label>
                                                </div>
                                                <div >
                                                    is the task completed?: {isEditTaskDone}
                                                </div>
                                                <div className="btn-group"  role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio"
                                                    onClick={e=> handleTaskCompleted(e, e.currentTarget.id)} className="btn-check" 
                                                    name="btnradio" 
                                                    id="Yes"
                                                    checked={isTaskDone === true}
                                                    />
                                                    <label className="btn btn-outline-primary" htmlFor="Yes" >Yes</label>

                                                    <input type="radio"  checked={isTaskDone === false}
                                                     onClick={e=> handleTaskCompleted(e, e.currentTarget.id)} 
                                                     className="btn-check" 
                                                     name="btnradio" 
                                                    id="No" />
                                                    <label className="btn btn-outline-primary" htmlFor="No">No</label>

                                            
                                                </div>
                                                
                                            </form>
                                        </main>
                                    </div>
                               

                            
                                </div>

                               
                            <div className="modal-footer">
                                <button type="button" ref={closemodal}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveEditedTask}>Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this tast for good? 
                                {taskToDel.map((t,index)=> <div key={index}>{t.name} {t.completed}</div> )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>



                </div> : <div>You are logged in</div>
}
       </div>
                    
    )
}

export default Task