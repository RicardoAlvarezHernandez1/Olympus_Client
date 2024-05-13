import React from "react";
import { UserContext, UserContextType } from "../context/UserContext";

type UserProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const UserProvider = (props: UserProviderProps) => {
  const { children } = props;

  const [user, setUser] = React.useState("");

  const setUserName = (username: string) => setUser(username);

  const [isLogged, setisLogged] = React.useState(false);

  const toggleIsLogged = () => setisLogged(!isLogged);

  const defaultValue: UserContextType = {
    user,
    isLogged,
    setUserName,
    toggleIsLogged,
  };

  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
