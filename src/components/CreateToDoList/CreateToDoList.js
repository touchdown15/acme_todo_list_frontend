import React, { 
  useState,
  useEffect,
  useRef
} from 'react';

import axios from '../../config/axios';

import './CreateToDoList.css'

function CreateToDoList(){
  const [nameTask, setNameTask] = useState('');
  const [nameList, setNameList] = useState('');
  const [saveData, setSaveData] = useState();

  const didMount = useRef(true);

  const handleSubmit = e =>{
    e.preventDefault();

    const saveData = {
      nameList,
      'task' : [
        {
          nameTask,
          'done': false
        }
      ]
    };

    setSaveData(saveData);
    
  }

  useEffect(() => {
    
    if(didMount.current){
      didMount.current = false;
      return;
    }

    async function saveList(){
      const request = await axios.post("/api/v1/todolist", saveData);
      console.log(request);
    }

    saveList();

  },[saveData]);

  return(
    <div className="create-todo-list-container">
      <div className="text-title">
        Nova Lista de Tarefas
      </div>
      <form className="forms-create-todo-list" onSubmit={handleSubmit}>
        <fieldset>
          <p className="name-list-title">Nome da lista</p>
          <input className="input-name-list" name="nameList" onChange={(e) => setNameList(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label>
            <p className="name-list-title">Nome da tarefa</p>
            <input className="input-task-name" name="nameTask" onChange={(e) => setNameTask(e.target.value)}/>
          </label>
        </fieldset>
        <button className="btn-submit-todolist" type="submit">Criar Lista</button>
      </form>
    </div>
  );
}

export default CreateToDoList;