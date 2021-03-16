import React,{
  useState,
  useEffect,
  useRef
} from 'react';
import axios from '../../config/axios';

import './ToggleDoneTask.css'

const ToggleDoneTask = (props) =>{

  //Responsavel por capturar se a tarefa foi concluida
  const [doneTaskId, setDoneTaskId] = useState();
  const [done, setDone] = useState(props.todoTaskIsDone);

  //Responsavel por não deixar o axios rodar quando criar o componente
  const didMountIsDoneTask = useRef(true);

  //Mudar para 'feito' as tarefas da lista
  useEffect(() => {
    
    if(didMountIsDoneTask.current){
      didMountIsDoneTask.current = false;
      return;
    }

    async function addDoneTaskButton(){
      const request = await axios.put(`/api/v1/task/donetask/${doneTaskId}`, JSON.stringify(done), { headers: {'Content-Type': 'application/json'} });
      return request;
    }
    addDoneTaskButton();

  },[done]);

  //Toggle para realizar tarefa
  const toggle = (id) => {
    setDone(!done);
    setDoneTaskId(id);
  }

  return(
    <div className="task-checkbox-container">
      <input  
        type="checkbox" 
        name="done"
        checked={done} 
        onChange={() => toggle(props.todoTaskId)} 
      />

      <div className={`checked${done ? "-task-inactive" : "-task-active"}`}>
        {props.todoTaskName}
      </div>
      
    </div>
  );


}

export default ToggleDoneTask;