import { useEffect, useState } from 'react'
import { getTasksApi } from '../services/api/tasks-api'

export default function useTaskSearch(page, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tasks, setTasks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    async function fetchData(){
      setLoading(true)
      setError(false)

      try{
        const tasks = await getTasksApi(page, limit)
        setTasks(prevTasks => {
          return [...new Set([...prevTasks, ...tasks.map(task => task)])]
        })
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
