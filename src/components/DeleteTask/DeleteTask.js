import React,{
  useState,
  useEffect,
  useRef
} from 'react';
import axios from '../../config/axios';

const DeleteTask = (props) =>{
  //Responsavel por capturar a id das task a ser deletada
  const [deleteId, setDeleteId] = useState();
  
  //Responsavel por não deixar o axios rodar quando criar o componente
  const didMountDelete = useRef(true);

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
  
  return(
    <div>
      <button onClick={() => setDeleteId(props.deleteTaskId)}>Deletar</button>
    </div>
  );

}

export default DeleteTask;