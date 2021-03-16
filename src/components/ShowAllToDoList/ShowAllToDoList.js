import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import axios from '../../config/axios';

function ShowAllToDoList () {
  //Responsavel por capturar todas as listas de tarefas
  const [todolist, setTodolist] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  
  //Input das tarefas adicionadas posteriomente
  const [inputList, setInputList] = useState([
    {
      nameTask: '',
      done: false
    }
  ]);
  const [saveTaskData, setTaskData] = useState();
  const [addTaskId, setAddTaskId] = useState();
  
  //Responsavel por capturar se a tarefa foi concluida
  const [doneTaskId, setDoneTaskId] = useState();
  const [done, setDone] = useState(false);


  //Responsavel por não deixar o axios rodar quando criar o componente
  const didMountDelete = useRef(true);
  const didMountAddTask = useRef(true);
  const didMountIsDoneTask = useRef(true);

  //Fetch para captura das listas de tarefas
  useEffect(() => {
    
    async function fetchData(){
      const request = await axios.get("/api/v1/todolist");
      setTodolist(request.data);
      return request;
    }

    fetchData();

  },[]);

  //Delete de uma tarefa especifica
  useEffect(() => {

    if(didMountDelete.current){
      didMountDelete.current = false;
      return;
    }
    
    async function deleteButton(){
      const request = await axios.delete(`/api/v1/task/${deleteId}`);
      return request;
    }
    deleteButton();

  },[deleteId]);

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

  },[doneTaskId]);

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

  //Toggle para realizar tarefa
  const toggle = (id) => {
    setDone(!done);
    setDoneTaskId(id);
  }
  
  return(
    <div>
      {todolist.map(todo=>(

        <div>
          <div>
            {todo.nameList}
          </div>

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
          
          <button onClick={() => handleSubmitTask(todo.id)}>Submit task</button>



          <div>
            {todo.task.map(task=>(
              <div>
                <div>
                  <input type="checkbox" name="done" onChange={() => toggle(task.id)} /> {task.nameTask}
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