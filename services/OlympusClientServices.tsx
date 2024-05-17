import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import { MuscleZoneInterface } from "../assets/interfaces/MuscleZoneInterface";
import { ExerciseInterface } from "../assets/interfaces/ExerciseInterface";
import { AchievementInterface } from "../assets/interfaces/AchievementInterface";

const REGISTRATION_PATH = "/user";
const IPDIRECTION = "192.168.11.24";
const API_URL = `http://${IPDIRECTION}:8082/olympus/v1`;

export const registerUser = async (
  userName: string,
  userMail: string,
  userPassword: string,
  userWeight: number,
  userHeight: number
): Promise<number> => {
  const response = await fetch(`${API_URL}${REGISTRATION_PATH}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: `${userName}`,
      userMail: `${userMail}`,
      userPassword: `${userPassword}`,
      userWeight: userWeight,
      userHeight: userHeight,
    }),
  });

  return response.status;
};

export const loginUser = async (
  userMail: string,
  userPassword: string
): Promise<Response> => {
  const response = await fetch(`${API_URL}/user/verifyUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userMail: `${userMail}`,
      userPassword: `${userPassword}`,
    }),
  });

  return response;
};

export const getUserRoutines = async (
  userId: number
): Promise<RoutineInterface[]> => {
  const response = await fetch(`${API_URL}/users/${userId}/routines`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const routines: RoutineInterface[] = await response.json();
  return routines;
};

export const newRoutine = async (
  userId: number,
  routineName: string
): Promise<number> => {
  const response = await fetch(`${API_URL}/routines/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routineName: `${routineName}`,
    }),
  });

  return response.status;
};

export const getMusclesZones = async (): Promise<MuscleZoneInterface[]> => {
  const response = await fetch(`${API_URL}/muscle_zone`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const routines: MuscleZoneInterface[] = await response.json();
  return routines;
};

export const getExercisesByMuscleZone = async (
  muscleZoneId: number
): Promise<ExerciseInterface[]> => {
  const response = await fetch(
    `${API_URL}/muscleZone/${muscleZoneId}/exercises`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const exercises: ExerciseInterface[] = await response.json();
  return exercises;
};

export const addExerciseToRoutine = async (
  exerciseId: number,
  routineId: number
): Promise<number> => {
  const response = await fetch(
    `${API_URL}/excercies/${exerciseId}/routines/${routineId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.status;
};

export const getExercisesByWorkout = async (
  routineId: number
): Promise<ExerciseInterface[]> => {
  const response = await fetch(`${API_URL}/routines/${routineId}/exercises`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const exercises: ExerciseInterface[] = await response.json();
  return exercises;
};

export const getExercisesById = async (
  exerciseId: number
): Promise<ExerciseInterface> => {
  const response = await fetch(`${API_URL}/exercises/${exerciseId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const exercise: ExerciseInterface = await response.json();
  return exercise;
};

export const getNews = async (): Promise<Response> => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=salud+deporte&pageSize=10&apiKey=e96f02e501f94f699cd812925e66db47`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const getAchievementsByUser = async (
  userId: number
): Promise<AchievementInterface[]> => {
  const response = await fetch(`${API_URL}/${userId}/achievements`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const ACHIEVEMENTS: AchievementInterface[] = await response.json();
  return ACHIEVEMENTS;
};
