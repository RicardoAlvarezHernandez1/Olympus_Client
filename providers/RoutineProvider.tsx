import React from "react";
import { RoutineContext, RoutineContextType } from "../context/RoutineContext";

type RoutineProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const RoutineProvider = (props: RoutineProviderProps) => {
  const { children } = props;

  const [routineName, setRoutine] = React.useState("");
  const [routineId, setWorkoutId] = React.useState(0);

  const setRoutineName = (username: string) => setRoutine(username);
  const setRoutineId = (id: number) => setWorkoutId(id);

  const defaultValue: RoutineContextType = {
    routineName,
    routineId,
    setRoutineName,
    setRoutineId,
  };

  return (
    <RoutineContext.Provider value={defaultValue}>
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
