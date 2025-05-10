import { useState } from "react";
import "./TodoList.css";
const TodoList = () => {

  // state management hooks
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState([]);
  const [completedTasks,setCompletedTasks] = useState([]);

  // add task
  const addTask = () =>{
    if(task.trim() !== ""){
      setTasks([...tasks,task]);
      setTask('');
    }
  }

  // update task
  const updateTask = (action,index) =>{
    
    const currentTask = tasks[index];
    const updatedTasks = tasks.filter(task => task !== currentTask);
    setTasks(updatedTasks);
    if(action === "completed"){
      setCompletedTasks([...completedTasks,currentTask]);
    }
  }

  return (
    <div>
      <h2 className="todoApp-head">2.Todo List App</h2>
      <div className="add-task">
        <input type="text" onChange={(e)=>setTask(e.target.value)} value={task}/>
        <button onClick={addTask}>ADD</button>
      </div>
      <div className="todoList-div">
        <div className="todo-list">
            <h2>Pending Tasks</h2>
            <ul>
                {
                  tasks.map((task,index)=>{
                    return <div key={index} className="task-field">
                      <li>{task}</li>
                      <button onClick={()=>updateTask("cancel",index)} id="cancel">cancel</button>
                      <button onClick={()=>updateTask("completed",index)} id="completed">completed</button>
                    </div>
                  })
                }
            </ul>
        </div>
        <div className="completed">
            <h2>Completed Tasks</h2>
            <ul>
                {
                  completedTasks.map((task,index)=>{
                    return <div key={index} className="task-field">
                      <li>{task}</li>
                    </div>
                  })
                }
            </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoList
