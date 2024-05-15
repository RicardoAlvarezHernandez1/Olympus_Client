import React from "react";

type ExerciseContextType = {
  exerciseId: number;
  exerciseName: string;
  exerciseDescription: string;
  urlImage: string;
  setExerciseId: Function;
  setExerciseName: Function;
  setExerciseDescription: Function;
  setUrlImage: Function;
};

const ExerciseContext = React.createContext({} as ExerciseContextType);

export { ExerciseContext, ExerciseContextType };
