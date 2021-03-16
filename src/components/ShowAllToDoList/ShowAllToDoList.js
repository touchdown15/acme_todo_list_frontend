import React, {
  useState,
  useEffect,
} from 'react';
import axios from '../../config/axios';

import CreateNewTask from '../CreateNewTask/CreateNewTask';
import ToggleDoneTask from '../ToggleDoneTask/ToggleDoneTask';
import DeleteTask from '../DeleteTask/DeleteTask';

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

        <div>
          <div>
            {todo.nameList}
          </div>

          <CreateNewTask todoAddTaskId={todo.id} />

          <div>
            {todo.task.map(task=>(
              <div>
                <ToggleDoneTask todoTaskId={task.id} todoTaskName={task.nameTask} />
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