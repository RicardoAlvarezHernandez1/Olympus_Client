import React from "react";
import { UserContext, UserContextType } from "../context/UserContext";

type UserProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const UserProvider = (props: UserProviderProps) => {
  const { children } = props;

  const [user, setUser] = React.useState("");
  const [userId, setUserId] = React.useState(0);
  const [isLogged, setisLogged] = React.useState(false);

  const setUserName = (username: string) => setUser(username);
  const setId = (id: number) => setUserId(id);
  const toggleIsLogged = () => setisLogged(!isLogged);

  const defaultValue: UserContextType = {
    user,
    userId,
    isLogged,
    setUserName,
    setId,
    toggleIsLogged,
  };

  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
