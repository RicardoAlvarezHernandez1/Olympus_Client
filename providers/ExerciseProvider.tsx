import React from "react";
import {
  ExerciseContext,
  ExerciseContextType,
} from "../context/ExerciseContext";

type ExerciseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const ExerciseProvider = (props: ExerciseProviderProps) => {
  const { children } = props;

  const [exerciseId, setExId] = React.useState(0);
  const [exerciseName, setExName] = React.useState("");
  const [exerciseDescription, setExDescription] = React.useState("");
  const [urlImage, setUrl] = React.useState("");

  const setExerciseId = (id: number) => setExId(id);
  const setExerciseName = (name: string) => setExName(name);
  const setExerciseDescription = (description: string) =>
    setExDescription(description);
  const setUrlImage = (url: string) => setUrl(url);

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
