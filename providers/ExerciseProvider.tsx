import React from "react";
import {
  ExerciseContext,
  ExerciseContextType,
} from "../context/ExerciseContext";

// Define the type for ExerciseProvider props
type ExerciseProviderProps = {
  children: JSX.Element | JSX.Element[]; // Children elements passed to the provider
};

// ExerciseProvider component
const ExerciseProvider = (props: ExerciseProviderProps) => {
  const { children } = props;

  // State variables for exercise data
  const [exerciseId, setExId] = React.useState(0);
  const [exerciseName, setExName] = React.useState("");
  const [exerciseDescription, setExDescription] = React.useState("");
  const [urlImage, setUrl] = React.useState("");

  // Functions to update exercise data
  /**
   * Sets the exercise ID.
   * @param id The ID of the exercise.
   */
  const setExerciseId = (id: number) => setExId(id);

  /**
   * Sets the exercise name.
   * @param name The name of the exercise.
   */
  const setExerciseName = (name: string) => setExName(name);

  /**
   * Sets the exercise description.
   * @param description The description of the exercise.
   */
  const setExerciseDescription = (description: string) =>
    setExDescription(description);

  /**
   * Sets the URL of the exercise image.
   * @param url The URL of the exercise image.
   */
  const setUrlImage = (url: string) => setUrl(url);

  // Create a default context value
  const defaultValue: ExerciseContextType = {
    exerciseId,
    exerciseName,
    exerciseDescription,
    urlImage,
    setExerciseId,
    setExerciseName,
    setExerciseDescription,
    setUrlImage,
  };

  return (
    <ExerciseContext.Provider value={defaultValue}>
      {children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseProvider;
