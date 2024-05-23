import React from "react";

// Define the type for the RoutineContext data
type RoutineContextType = {
  routineId: number;
  routineName: string;
  // Functions to update context values
  setRoutineName: Function;
  setRoutineId: Function;
};

// Create RoutineContext with initial empty object and type RoutineContextType
const RoutineContext = React.createContext({} as RoutineContextType);

// Exporting the RoutineContext and RoutineContextType for use in other components
export { RoutineContext, RoutineContextType };
