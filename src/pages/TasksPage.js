import React, { useCallback, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useTaskSearch from '../hooks/useTaskSearch';
import { createTaskApi, deleteTaskApi, getTasksApi, updateTaskApi } from '../services/api/tasks-api';
import { useTaskStore } from '../services/state/task-store';

const TasksPage = () => {
  const [goToHome, setGoToHome] = useState(false);
  const [goToRobots, setGoToRobots] = useState(false);
  const [goToAbout, setGoToAbout] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [robotId, setRobotId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);

  const { tasks, hasMore, loading, error } = useTaskSearch(page, limit);

  const observer = useRef()
  const lastTaskElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPage(prevPage => prevPage + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore]);

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const onRobotIdChange = (event) => {
    setRobotId(event.target.value)
  }

  
  const { createTask, updateTask, deleteTask } = useTaskStore();

  const onCreate = async () => {
    const task = {
      "name": name,
      "description": description,
      "status": status,
      "robotid": robotId
    }
    try{
      const result = await createTaskApi(task)
      createTask(result)
    } catch(err){
      console.log(err)
    }
  }

  const onUpdate = async (id) => {
    const updatedTask = {
      "name": name,
      "description": description,
      "status": status,
      "robotid": robotId
    }

    try{
      const task = await updateTaskApi(id, updatedTask)
      updateTask(task)
    } catch(err){
      console.log(err)
    }
  }

  const onDelete = async (id) => {
    try{
      await deleteTaskApi(id)
      deleteTask(id)
    } catch(err){
      console.log(err)
    }
  }

  return(
    <>
      <h1>Tasks Page</h1>
      

      <Button onClick={() => setGoToHome(true)}>Go to Home</Button>
      {goToHome && <Navigate to='/' />}
      <Button onClick={() => setGoToRobots(true)}>Go to Robots</Button>
      {goToRobots && <Navigate to='/robots' />}
      <Button onClick={() => setGoToAbout(true)}>Go to About</Button>
      {goToAbout && <Navigate to='/about' />}

      <br/>

      <Button onClick={onCreate}>Create Task</Button>
      <Input type="text" placeholder="Task Name" onChange={onNameChange}/>
      <Input type="text" placeholder="Task Description" onChange={onDescriptionChange}/>
      <Input type="text" placeholder="Task Status" onChange={onStatusChange}/>
      <Input type="text" placeholder="Task Robot Id" onChange={onRobotIdChange}/>

      
      {tasks.map((task, index) => {
        if(tasks.length === index + 1){
          return (
            <div ref={lastTaskElementRef}>
              <TaskCard 
                key={task.id} id={task.id} 
                name={task.name} 
                description={task.description} 
                status={task.status} 
                robotId={task.robotid}
                onUpdate={() => onUpdate(task.id)}
                onDelete={() => onDelete(task.id)}
              />
            </div>
          );
        } else {
          return (
            <TaskCard 
              ref={lastTaskElementRef} 
              key={task.id} id={task.id} 
              name={task.name} 
              description={task.description} 
              status={task.status} 
              robotId={task.robotid}
              onUpdate={() => onUpdate(task.id)}
              onDelete={() => onDelete(task.id)}
            />
          );
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default TasksPage;