export const ADD_TASK_SCHEDULE = "ADD_TASK_SCHEDULE";
export const REMOVE_TASK_SCHEDULE = "REMOVE_TASK_SCHEDULE";

export const addTaskSchedule: (task: Task) => Action = (task) => {
  return {
    type: ADD_TASK_SCHEDULE,
    payload: task,
  };
};

export const removeTaskSchedule: (id: number) => Action = (task) => {
  return {
    type: REMOVE_TASK_SCHEDULE,
    payload: id,
  };
};
