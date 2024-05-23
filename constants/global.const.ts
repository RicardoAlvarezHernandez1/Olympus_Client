export const IPDIRECTION = "192.168.1.33";

export const OLYMPUS_CLIENT_BACKGROUND_IMAGE = require("../assets/images/Fondo_Olympus_Client.png");

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email: string) => {
  return email.match(EMAIL_REGEX) !== null;
};
