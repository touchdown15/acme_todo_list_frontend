import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

function ShowAllToDoList () {
  const [todolist, setTodolist] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [done, setDone] = useState(false);


  useEffect(() => {
    
    async function fetchData(){
      const request = await axios.get("/api/v1/todolist");
      setTodolist(request.data);
      return request;
    }

    fetchData();

  },[]);

  useEffect(() => {
    
    async function deleteButton(){
      const request = await axios.delete(`/api/v1/task/${deleteId}`);
      return request;
    }
    deleteButton();

  },[deleteId]);

  function toggle(){
    setDone(!done);
  }
  
  return(
    <div>
      {todolist.map(todo=>(

        <div>
          <div>
            {todo.nameList}
          </div>
          <div>
            <button onClick={() => console.log("adicionei")}>Adicionar</button>
          </div>
          <div>
            {todo.task.map(task=>(
              <div>
                <div>
                  <input type="checkbox" name="done" onChange={toggle} /> {task.nameTask}
                </div>
                <button onClick={() => setDeleteId(task.id)}>Deletar</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowAllToDoList;