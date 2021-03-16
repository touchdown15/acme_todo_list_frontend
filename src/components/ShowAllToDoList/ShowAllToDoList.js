import React, {
  useState,
  useEffect,
} from 'react';
import axios from '../../config/axios';

import CreateNewTask from '../CreateNewTask/CreateNewTask';
import ToggleDoneTask from '../ToggleDoneTask/ToggleDoneTask';
import DeleteTask from '../DeleteTask/DeleteTask';

import './ShowAllToDoList.css'

function ShowAllToDoList () {
  //Responsavel por capturar todas as listas de tarefas
  const [todolist, setTodolist] = useState([]);

  //Fetch para captura das listas de tarefas
  useEffect(() => {
    
    async function fetchData(){
      const request = await axios.get("/api/v1/todolist");
      setTodolist(request.data);
      return request;
    }

    fetchData();

  },[]);
  
  return(
    <div>
      {todolist.map(todo=>(

        <div className="show-todo-list-container">
          
          <div className="name-todo-list">
            {todo.nameList}
          </div>

          <div> 
            <CreateNewTask todoAddTaskId={todo.id} />

            {todo.task.map(task=>(
              <div className="tasks">
                <ToggleDoneTask todoTaskId={task.id} todoTaskName={task.nameTask} todoTaskIsDone={task.done} />
                <DeleteTask deleteTaskId={task.id} />
              </div>
            ))}

          </div>

        </div>
      ))}
    </div>
  );
}

export default ShowAllToDoList;