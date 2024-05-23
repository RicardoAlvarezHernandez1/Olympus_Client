import React from "react";
import { UserContext, UserContextType } from "../context/UserContext";

// Define the type for UserProvider props
type UserProviderProps = {
  children: JSX.Element | JSX.Element[]; // Children elements passed to the provider
};

// UserProvider component
const UserProvider = (props: UserProviderProps) => {
  const { children } = props;

  // State variables for user data
  const [user, setUser] = React.useState("");
  const [userId, setUserId] = React.useState(0);
  const [isLogged, setisLogged] = React.useState(false);

  // Functions to update user data
  /**
   * Sets the username of the user.
   * @param username The username of the user.
   */
  const setUserName = (username: string) => setUser(username);

  /**
   * Sets the ID of the user.
   * @param id The ID of the user.
   */
  const setId = (id: number) => setUserId(id);

  /**
   * Toggles the value of isLogged between true and false.
   */
  const toggleIsLogged = () => setisLogged(!isLogged);

  // Create a default context value
  const defaultValue: UserContextType = {
    user,
    userId,
    isLogged,
    setUserName,
    setId,
    toggleIsLogged,
  };

  // Provide the context value to its children components
  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
