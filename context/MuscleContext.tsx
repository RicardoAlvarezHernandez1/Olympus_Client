import React from "react";

type MuscleContextType = {
  muscleZoneId: number;
  muscleName: string;
  setMuscleName: Function;
  setMuscleZoneId: Function;
};

const MuscleContext = React.createContext({} as MuscleContextType);

export { MuscleContext, MuscleContextType };
