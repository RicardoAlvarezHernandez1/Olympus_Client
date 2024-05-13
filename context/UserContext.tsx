import React from "react";

type UserContextType = {
  isLogged: boolean;
  user: string;
  setUserName: Function;
  toggleIsLogged: Function;
};

const UserContext = React.createContext({} as UserContextType);

export { UserContext, UserContextType };
