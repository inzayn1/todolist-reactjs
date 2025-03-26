import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleCheck, faPen, faTrashCan
 } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
   //tasks (todos) state
  const [toDo, setToDo] = useState([
   
  ]);
  //temp task state
  const [NewTask, setNewTask] = useState("");
  const[updateData, setUpdateData] = useState("");

  //add task
  const addTask = () => {
    if(NewTask){
      let num = toDo.length + 1;
      let newEntry = { id: num, title: NewTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
      
      }
  

  //delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
    
  }

  //mark task as done
  const markDone = (id) => {
    let newTasks = toDo.map( task => {
      if(task.id === id){
        return ({...task, status: !task.status})
      }
      return task;
  })
  setToDo(newTasks);
  }
  //cancel update
  const cancelUpdate = () => {
    setUpdateData('');
    
  }
  //change task for update
  const changeTask = (e) => {
    let newEntry= {
      id:updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false

    }
    setUpdateData(newEntry);
    
  }
  //update task
  const updateTask = (id) => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
    
  }
  



  return (
    <div className="container app">
      <br></br>
      <h2>To Do List App(React)</h2>
      <br></br>


      {/* update task */}
      {updateData && updateData ? (
        <>
          <div className="row">
        <div className="col">
          <input
          value={updateData && updateData.title}
          onChange={(e) => changeTask(e)}
          className=" form-control form-control-lg"/>
        </div>
        <div className="col-auto">
          <button
          onClick={updateTask}
          className="btn btn-lg btn-success mr-20"
          >Update</button>
          <button
          onClick={cancelUpdate}
          className="btn btn-lg btn-warning "
          >Cancel</button>
        </div>
          </div>
          <br/>
        </>

      ): (
<>
<div className="row">
        <div className="col">
          <input
          value={NewTask}
          onChange={ (e) => setNewTask(e.target.value)}
          className="form-control form-control-lg"/>
          </div>
          <div className="col-auto">
            <button
            onClick={addTask}
              className="btn btn-lg btn-success">
                Add Task
            </button>
            
          </div>
        </div>
        <br/>
</>
      )
    }
     
        
          
  
    

     
     {/* display todos */}

     {toDo && toDo.length ? '': 'No task .....'}

     {toDo && toDo
     .sort((a, b) => a.id > b.id ? 1 : -1)
     
     .map( ( task, index) => {
      return(
        <React.Fragment key={task.id}>

         <div className='col taskbg'>

          <div className={task.status ? 'done' : ''}>
          <span className="taskNumber">{index + 1}</span>
          <span className="tasktext">{task.title}</span>

          </div>
          <div className="iconsWrap">
            <span title="completed / not completed" 
             onClick={(e) => markDone(task.id)}>
            <FontAwesomeIcon icon={faCircleCheck} />
            </span>

            {task.status ? null :(
             <span title="edit"
             onClick={() => setUpdateData( {
              id: task.id,
              title: task.title,
              status: task.status ? true : false
             })}>
              <FontAwesomeIcon icon={faPen} />
            </span>
            )}
            <span title="delete"  
            onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>

         </div>


          
        </React.Fragment>
      )
     })
     
     }


    </div>
  );
}

export default App;
