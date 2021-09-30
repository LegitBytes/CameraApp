import axios from "axios";
import React, { useReducer, createContext, Reducer } from "react";

interface State {
  userToken: string | undefined;
  userId: string | undefined;
}
interface Action {
  type: "LOGIN" | "LOGOUT" | "TOGGLE SUPERADMIN";
  payload: undefined | { userToken: string; userId: string };
}

const initialState: State = {
  userToken: undefined,
  userId: undefined,
};

const AuthContext = createContext({
  userToken: undefined,
  userId: undefined,
  login: (userData: string, userId: string) => {},
  logout: () => {},
});

const authReducer: Reducer<State, Action> = (state: State, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        userToken: action.payload?.userToken,
        userId: action.payload?.userId,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userToken: undefined,
        userId: undefined,
      };
    }

    default:
      return state;
  }
};

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: string, userId: string) => {
    axios.defaults.headers.common["AUTHORIZATION"] = userData;
    dispatch({
      type: "LOGIN",
      payload: { userToken: userData, userId: userId },
    });
  };

  const logout = () => {
    axios.defaults.headers.common["AUTHORIZATION"] = "";
    dispatch({
      type: "LOGOUT",
      payload: undefined,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        userToken: state.userToken,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
