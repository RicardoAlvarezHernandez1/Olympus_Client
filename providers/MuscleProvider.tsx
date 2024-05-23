import React from "react";
import { MuscleContext, MuscleContextType } from "../context/MuscleContext";
// Define the type for MuscleProvider props
type MuscleProviderProps = {
  children: JSX.Element | JSX.Element[]; // Children elements passed to the provider
};

// MuscleProvider component
const MuscleProvider = (props: MuscleProviderProps) => {
  const { children } = props;

  // State variables for muscle data
  const [muscleName, setMuscle] = React.useState("");
  const [muscleZoneId, setMuscleId] = React.useState(0);

  // Functions to update muscle data
  /**
   * Sets the name of the muscle.
   * @param name The name of the muscle.
   */
  const setMuscleName = (name: string) => setMuscle(name);

  /**
   * Sets the ID of the muscle zone.
   * @param id The ID of the muscle zone.
   */
  const setMuscleZoneId = (id: number) => setMuscleId(id);

  // Create a default context value
  const defaultValue: MuscleContextType = {
    muscleName,
    muscleZoneId,
    setMuscleName,
    setMuscleZoneId,
  };

  // Provide the context value to its children components
  return (
    <MuscleContext.Provider value={defaultValue}>
      {children}
    </MuscleContext.Provider>
  );
};

export default MuscleProvider;
