import React from "react";

// Define the type for the ExerciseContext data
type ExerciseContextType = {
  exerciseId: number;
  exerciseName: string;
  exerciseDescription: string;
  urlImage: string;
  // Functions to update context values
  setExerciseId: Function;
  setExerciseName: Function;
  setExerciseDescription: Function;
  setUrlImage: Function;
};

// Create ExerciseContext with initial empty object and type ExerciseContextType
const ExerciseContext = React.createContext({} as ExerciseContextType);

// Exporting the ExerciseContext and ExerciseContextType for use in other components
export { ExerciseContext, ExerciseContextType };
