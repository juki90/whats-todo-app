declare module "*.png";

type Task = {
  id: number;
  name: string;
  type: string;
  regular?: number;
  date?: Date;
  time?: Date;
  important?: boolean;
  optional?: { id: number; name: string; done?: boolean }[];
  timer?: number;
  done?: boolean;
};

type reducerState = {
  schedule: Task[];
  history: Task[];
  forAcceptance: Task[];
  saved: Task[];
};

type addTaskScheduleAction = {
  type: string;
  payload: Task;
};

type removeTaskScheduleAction = {
  type: string;
  payload: number;
};

type Action = addTaskScheduleAction | removeTaskScheduleAction;
