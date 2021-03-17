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

  //Mostrar todos os detalhes das listas de tarefas
  const [showHideCard, setShowHideCard] = useState(false);

  //Fetch para captura das listas de tarefas
  useEffect(() => {
    
    async function fetchData(){
      const request = await axios.get("/api/v1/todolist");
      setTodolist(request.data);
      return request;
    }

    fetchData();

  },[]);

  //Handle para mostrar e esconder todas as descrições das tarefas
  const handleShowAndHide = () =>{
    setShowHideCard(!showHideCard);
  }
  
  return(
    <div>
      {todolist.map(todo=>(

        <div className="show-todo-list-container">
          
          <div className="name-todo-list" onClick={handleShowAndHide}>
            {todo.nameList}
          </div>

          { showHideCard ? 
            
            <div className="todo-list">

              <CreateNewTask todoAddTaskId={todo.id} />

              {todo.task.map(task=>(
                <div className="tasks">
                  <ToggleDoneTask todoTaskId={task.id} todoTaskName={task.nameTask} todoTaskIsDone={task.done} />
                  <DeleteTask deleteTaskId={task.id} />
                </div>
              ))}

            </div>

          : null}
          

        </div>
      ))}
    </div>
  );
}

export default ShowAllToDoList;