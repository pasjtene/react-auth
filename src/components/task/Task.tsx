import React, { ChangeEvent, FC, useEffect, useState } from "react";
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
const [isTaskDone, setTaskDone] = useState<boolean>(false);
const [todoList, setTodoList] = useState<ITask[]>([])
const [doneList, setDoneList] = useState<ITask[]>([])
const [taskToDel, setTaskToDel] = useState<ITask[]>([])

const [istaskSet, setTaskSet] = useState(false)
const [user, setUser] = useState({} as Authuser)
const [user2, setUser2] = useState({})

const[taskid, setTaskId] = useState(0)
const[taskids, setTaskIds] = useState<number[]>([])
const theme = useThemeContext()

axios.defaults.withCredentials = true;

const authUser = useAuthuser();
const isUserAuth = ():number =>  authUser.user?.firstName?.length || props.user?.firstName?.length

useEffect(()=>{
    if(authUser.user?.firstName?.length) setUser(authUser.user) 
    if(props.user?.firstName?.length) setUser(props.user) 

    console.log("The theme is ",theme)
    
})



useEffect(()=> {

    //this gets the user, who is set at login, and app on refresh
    const utask = Cookies.get("utasks")


    if (utask) {
      const  dparsed = JSON.parse(utask)
      const t = JSON.stringify(dparsed.user)
      setUser(dparsed)
        //console.log("The user tasks from cookies...", JSON.parse(JSON.stringify(Cookies.get("utasks"))))
        console.log("The user 3 tasks from cookies...", JSON.parse(utask))
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

   const td = props?.user?.tasks?.map((e:ITask)=>{
    setTodoList([...todoList, e])
    })

        const td2 = props?.user?.tasks?.map((e:ITask)=>{
            if(td.length>todoList.length)
            todoList.push(e)
        })
    
    const newTask =  {
        //id: getRandomInt(1,1000),
        id: todoList.length+1,
        name: taskName,
        deadLine: deadLine,
        completed: isTaskDone
    }

    //reset values
    setTodoList([...todoList, newTask])
    setTaskName("")
    setDeadLine(0)


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
},[taskid,todoList])



const completeTask2 = (taskToComplete: ITask):void => {
    //setTodoList(todoList.filter((task)=> task.name != taskToComplete.name))

    console.log("The todo list le ..", todoList.length)

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
                        </div> 
                            
                        

                        {!authUser.user?.tasks?.length?
                        <div>

                        { props.user?.tasks?.length?
                        <div>
                                
                            {todoList.map((task:ITask, key:number)=>{
                            
                                return !task.completed&&<TodoTask task={task} key={key} completeTask2={completeTask2}/>
                                
                            })
                            }
                        </div>:null
                        }

                        </div>:null

                        }

                       



                        {authUser.user?.tasks?.length?
                        <div>
                                
                            {authUser.user.tasks.map((task:ITask, key:number)=>{
                            
                                return !task.completed&&<TodoTask task={task} key={key} completeTask2={completeTask2}/>
                                
                            })
                            }
                        </div>:null
                        }

                            { !todoList.length?
                            <div>
                            {props.user?.tasks?.map((task:ITask, key:number)=>{
                                //todoList.length?setTodoList([...todoList, ...props.user?.tasks])
                            
                            return !task.completed&&<TodoTask task={task} key={key} completeTask2={completeTask2}/>
                            })}
                            </div>:null
                            }
                    
                        </div>

                        
                

                            <div className="todoList" style={{...theme.theme?.secondary}}>
                                Completed tasks
                                {todoList.map((task:ITask, key:number)=>{
                                    return task.completed&&
                                
                                    <div key={key}>
                                        
                                        <TodoTask task={task} completeTask2={completeTask2}/>
                                        <button type="button" onClick={()=>addTaskToDel(task)} className="btn btn-primary" data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal">
                                            Delete this task
                                        </button>
                                    
                                    </div>
                                    
                                })}
                                
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