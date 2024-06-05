import { useEffect, useState } from 'react'
import { getRobotsApi } from '../services/api/robots-api'

export default function useRobotLoad(page, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [robots, setRobots] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      setError(false);

      try{
        const user_id = localStorage.getItem("user_id");
        console.log('user_id', user_id)
        const robots = await getRobotsApi(user_id, page, limit);
        setRobots(prevRobots => {
          return [...new Set([...prevRobots, ...robots.map(robot => robot)])];
        });
        setHasMore(robots.length > 0);
        setLoading(false);
      } catch(err){
        setError(true);
      }
    }
    fetchData();
  }, [page, limit])
  
  return { loading, error, robots, hasMore }
}
