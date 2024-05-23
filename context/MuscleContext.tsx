import React from "react";

// Define the type for the MuscleContext data
type MuscleContextType = {
  muscleZoneId: number;
  muscleName: string;
  // Functions to update context values
  setMuscleName: Function;
  setMuscleZoneId: Function;
};

// Create MuscleContext with initial empty object and type MuscleContextType
const MuscleContext = React.createContext({} as MuscleContextType);

// Exporting the MuscleContext and MuscleContextType for use in other components
export { MuscleContext, MuscleContextType };
