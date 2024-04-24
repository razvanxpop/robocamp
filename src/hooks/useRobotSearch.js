import { useEffect, useState } from 'react'
import { getRobotsApi } from '../services/api/robots-api'

export default function useRobotSearch(page, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [robots, setRobots] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      setError(false);
  
      try{
        const robots = await getRobotsApi(page, limit);
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
