import React from "react";

type UserContextType = {
  isLogged: boolean;
  user: string;
  setUserName: Function;
  toggleIsLogged: Function;
  userId: number;
  setId: Function;
};

const UserContext = React.createContext({} as UserContextType);

export { UserContext, UserContextType };
