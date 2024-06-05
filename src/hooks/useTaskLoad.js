import { useEffect, useState } from 'react'
import { getRobotsApi } from '../services/api/robots-api'
import { getTasksApi } from '../services/api/tasks-api'

export default function useTaskLoad(page, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tasks, setTasks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    async function fetchData(){
      setLoading(true)
      setError(false)

      try{
        const user_id = localStorage.getItem("user_id")
        limit = 100;
        const tasks = await getTasksApi(page, limit)
        console.log('tasks', tasks)
        const robots = await getRobotsApi(user_id, page, limit)
        console.log('robots', robots)
        setTasks(prevTasks => {
          return [...new Set([...prevTasks, ...tasks.filter(task => {
            console.log('task', task)
            let found = false
            robots.map(robot => {
              if(task.robot_id === robot.id){
                found = true;
              }
            })
            return found;
          })])]
        })
        console.log('tasks new', tasks)
        setHasMore(tasks.length > 0)
        setLoading(false)
      } catch(err){
        setError(true)
      }
    }
    fetchData();
  }, [page, limit])
  
  return { loading, error, tasks, hasMore }
}
