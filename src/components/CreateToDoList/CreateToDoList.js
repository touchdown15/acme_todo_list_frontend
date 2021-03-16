import React, { 
  useState,
  useEffect,
  useRef
} from 'react';

import axios from '../../config/axios';

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
    <div>
      <div>
        Criar nova lista de tarefas
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <p>Nome da lista</p>
          <input name="nameList" onChange={(e) => setNameList(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label>
            <p>Nome da tarefa</p>
            <input name="nameTask" onChange={(e) => setNameTask(e.target.value)}/>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateToDoList;