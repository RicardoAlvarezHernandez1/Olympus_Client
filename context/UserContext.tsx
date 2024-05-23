import React from "react";

// Define the type for the UserContext data
type UserContextType = {
  isLogged: boolean; // Indicates whether the user is logged in
  user: string; // User information (name or username)
  // Functions to update context values
  setUserName: Function; // Function to set the user name
  toggleIsLogged: Function; // Function to toggle the logged-in state
  userId: number; // User ID
  setId: Function; // Function to set the user ID
};

// Create UserContext with initial empty object and type UserContextType
const UserContext = React.createContext({} as UserContextType);

// Exporting the UserContext and UserContextType for use in other components
export { UserContext, UserContextType };
