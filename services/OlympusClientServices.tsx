import { IpDirection } from "./IpDirection";

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

export const loginuser = async (userName: string): Promise<Response> => {
  const response = await fetch(`${API_URL}/users/${userName.trim()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};
