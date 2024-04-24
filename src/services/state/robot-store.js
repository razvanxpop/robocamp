import { create } from 'zustand';

export const useRobotStore = create()(
  (set, get) => ({
    robots: [],
    createRobot: (robot) => {
      set({robots: [...get().robots, robot]})
    },
    updateRobot: (robot) => {
      set({robots: get().robots.map(r => {
        if(r.key !== robot.key)
          return r
        return robot
      })})
    },
    deleteRobot: (robot) => {
      set({robots: get().robots.filter(r => r.key !== robot.key)})
    }
  })
)