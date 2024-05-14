import { IpDirection } from "./IpDirection";
import { RoutineInterface } from "../assets/interfaces/RoutineInterface";
import { MuscleZoneInterface } from "../assets/interfaces/MuscleZoneInterface";
import { ExerciseInterface } from "../assets/interfaces/ExerciseInterface";

const API_URL = `http://${IpDirection()}:8082/olympus/v1`;
const REGISTRATION_PATH = "/user";

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

export const loginUser = async (userName: string): Promise<Response> => {
  const response = await fetch(`${API_URL}/user/${userName.trim()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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

// "/muscleZone/{muscleZoneId}/exercises"

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
