import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import axios from '../../config/axios';

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
  Handle dos inputs de adição de uma nova linha ou remoção 
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

  //Handle para colocar organizar a task e salvar
  const handleSubmitTask = (id) =>{
    
    const saveAddTask = {
      'nameList' : 'taskSave',
      'task': inputList
    }
  
    setTaskData(saveAddTask);
    setAddTaskId(id);

  }

  return(

    <div>

      {inputList.map((x, i) =>{
        return(
          <div>

            <input
              className="campo-tarefa"
              name="nameTask"
              placeholder = "Nome da tarefa"
              value={x.nameTask}
              onChange={e => handleInputCange(e, i)}
            />
            
            <div>
              {inputList.lenght !== 1 && <button className="campo-tarefa" onClick={() => handleRemoveClick(i)}>Remover</button>}

              {inputList.length - 1 === i && <button onClick={handleAddClick}>Adicionar</button>}
            </div>

          </div>
        );
      })}
      
      <button onClick={() => handleSubmitTask(props.todoAddTaskId)}>Submit task</button>

    </div>
  );


}

export default CreateNewTask;