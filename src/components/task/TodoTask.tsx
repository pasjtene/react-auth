import React from "react";
import { ITask } from "./taskinterface";

interface Props {
    task:ITask
    //completeTask(taskName: string):void
    completeTask2(taskName:ITask) :void
    
}

const TodoTask = ({task, completeTask2} :Props) => {

    return (
        <div className="task">
            <div className="content">
                <span>
                {task.id}
                </span>
                <span>
                {task.name}
                </span>
                <span>
                {task.deadLine}
                </span>
            </div>
             <button onClick={()=> completeTask2(task)}>X</button>
             
        </div>

    )
         
}

export default TodoTask