import React from "react";
import { RoutineContext, RoutineContextType } from "../context/RoutineContext";

// Define the type for RoutineProvider props
type RoutineProviderProps = {
  children: JSX.Element | JSX.Element[]; // Children elements passed to the provider
};

// RoutineProvider component
const RoutineProvider = (props: RoutineProviderProps) => {
  const { children } = props;

  // State variables for routine data
  const [routineName, setRoutine] = React.useState("");
  const [routineId, setRoutId] = React.useState(0);

  // Functions to update routine data
  /**
   * Sets the name of the routine.
   * @param name The name of the routine.
   */
  const setRoutineName = (name: string) => setRoutine(name);

  /**
   * Sets the ID of the routine.
   * @param id The ID of the routine.
   */
  const setRoutineId = (id: number) => setRoutId(id);

  // Create a default context value
  const defaultValue: RoutineContextType = {
    routineName,
    routineId,
    setRoutineName,
    setRoutineId,
  };

  // Provide the context value to its children components
  return (
    <RoutineContext.Provider value={defaultValue}>
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
