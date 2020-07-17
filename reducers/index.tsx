import { ADD_TASK_SCHEDULE, REMOVE_TASK_SCHEDULE } from "../actions";

const initialState: reducerState = {
  schedule: [],
  history: [],
  forAcceptance: [],
  saved: [],
};

const rootReducer = (state: reducerState = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_SCHEDULE:
      return {
        ...state,
        schedule: [...state.schedule, action.payload]
          .map((t) => {
            const task = t;
            task.start = new Date(t.start).getTime();
            return task;
          })
          .sort((a, b) => {
            return b.start - a.start;
          })
          .map((t, i) => {
            const task = t;
            task.id = i;
            return task;
          }),
      };
    case REMOVE_TASK_SCHEDULE:
      return {
        ...state,
        schedule: [
          ...state.schedule
            .filter((t) => t.id !== action.payload)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
