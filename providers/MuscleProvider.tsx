import React from "react";
import { MuscleContext, MuscleContextType } from "../context/MuscleContext";

type MuscleProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const MuscleProvider = (props: MuscleProviderProps) => {
  const { children } = props;

  const [muscleName, setMuscle] = React.useState("");
  const [muscleZoneId, setMuscleId] = React.useState(0);

  const setMuscleName = (username: string) => setMuscle(username);
  const setMuscleZoneId = (id: number) => setMuscleId(id);

  const defaultValue: MuscleContextType = {
    muscleName,
    muscleZoneId,
    setMuscleName,
    setMuscleZoneId,
  };

  return (
    <MuscleContext.Provider value={defaultValue}>
      {children}
    </MuscleContext.Provider>
  );
};

export default MuscleProvider;
