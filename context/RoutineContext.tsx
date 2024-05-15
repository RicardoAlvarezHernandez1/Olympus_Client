import React from "react";

type RoutineContextType = {
  routineId: number;
  routineName: string;
  setRoutineName: Function;
  setRoutineId: Function;
};

const RoutineContext = React.createContext({} as RoutineContextType);

export { RoutineContext, RoutineContextType };
