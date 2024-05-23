// Constant representing the IP address
export const IPDIRECTION = "192.168.1.33";

// Constant representing the background image for the Olympus client
export const OLYMPUS_CLIENT_BACKGROUND_IMAGE = require("../assets/images/Fondo_Olympus_Client.png");

// Regular expression for validating email addresses
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address using a regular expression.
 * @param email The email address to validate.
 * @returns A boolean indicating whether the email address is valid or not.
 */
export const validateEmail = (email: string) => {
  return email.match(EMAIL_REGEX) !== null;
};
