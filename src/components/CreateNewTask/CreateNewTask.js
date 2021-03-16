import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { GrAdd } from 'react-icons/gr';
import { BiTrash } from 'react-icons/bi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from '../../config/axios';

import './CreateNewTask.css'

const CreateNewTask = (props) =>{

  //Input das tarefas adicionadas posteriomente
  const [inputList, setInputList] = useState([
    {
      nameTask: '',
      done: false
    }
  ]);
  const [saveTaskData, setTaskData] = useState();
  const [addTaskId, setAddTaskId] = useState();

  //Mostra ou esconder os inputs de tarefas
  const [showInputList, setShowInputList] = useState(false);

  //Responsavel por não deixar o axios rodar quando criar o componente
  const didMountAddTask = useRef(true);

  //Adicionar tarefas a uma lista existente
  useEffect(() => {
    
    if(didMountAddTask.current){
      didMountAddTask.current = false;
      return;
    }

    async function addTaskButton(){
      const request = await axios.put(`/api/v1/todolist/addtask/${addTaskId}`, saveTaskData, { headers: {'Content-Type': 'application/json'} });
      return request;
    }
    addTaskButton();

  },[addTaskId]);
  
  /*
  Handler dos inputs de adição de uma nova linha ou remoção 
  (Criação de uma nova tarefa) 
  */
  const handleInputCange = (e, index) =>{
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index =>{
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  const handleAddClick = () => {
    setInputList([...inputList, { nameTask: '', isDone: false }]);
  };

  //Handler para mostrar ou esconder os inputs
  const showInput = () => setShowInputList(!showInputList)

  //Handler para colocar organizar a task e salvar
  const handleSubmitTask = (id) =>{
    
    const saveAddTask = {
      'nameList' : 'taskSave',
      'task': inputList
    }
  
    setTaskData(saveAddTask);
    setAddTaskId(id);

  }

  return(

    <div className="add-task-container" >

      <div>
        <input type="submit" value="Criar Nova tarefa" onClick={showInput} />
        { showInputList ? 
        
        <div>
          {inputList.map((x, i) =>{
            return(
              <div className="input-task" >

                <input
                  name="nameTask"
                  placeholder = "Nome da tarefa"
                  value={x.nameTask}
                  onChange={e => handleInputCange(e, i)}
                />
            
                {inputList.lenght !== 1 && <a className="btn-remove-row" onClick={() => handleRemoveClick(i)}> <BiTrash size={20} /> </a>}
                {inputList.length - 1 === i && <a className="btn-add-row" onClick={handleAddClick}> <IoIosAddCircleOutline size={20} /> </a>}
              </div>
            );
          })}
          
          <button onClick={() => handleSubmitTask(props.todoAddTaskId)}>Adicionar tarefa</button>
        </div>

        : null}
      </div>


    </div>
  );


}

export default CreateNewTask;