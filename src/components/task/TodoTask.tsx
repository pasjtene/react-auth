import React from "react";
import { ITask } from "./taskinterface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHouse, faPen, faRestroom} from '@fortawesome/free-solid-svg-icons'

interface Props {
    task:ITask
    //completeTask(taskName: string):void
    completeTask2(taskName:ITask) :void
    editTask(taskName:ITask) :void
    
}

const TodoTask = ({task, completeTask2,editTask} :Props) => {

    return (
        <div className="task">
            <div className="content">
                <span style={{width:"100px"}}>
                {task.id}
                </span>
                <span>
                {task.name}
                </span>
                <span style={{width:"100px"}}>
                {task.deadLine}
                </span>
            </div>
            <button 
                className="editBtn"
                data-bs-toggle="modal" 
                data-bs-target="#edittask" 
                onClick={()=> editTask(task)}> <FontAwesomeIcon icon={faPen} size="2x" />
            </button>
             <button onClick={()=> completeTask2(task)}>X</button>
             
        </div>

    )
         
}

export default TodoTask