import React, { useReducer, createContext, Reducer } from "react";

interface State {
  userToken: string | undefined | boolean;
  userId: string | undefined | boolean;
  isSuperAdmin: boolean | undefined | string;
}
interface Action {
  type: "LOGIN" | "LOGOUT";
  payload: undefined | { userToken: string, userId: string, isSuperAdmin: boolean };
}

const initialState: State = {
  userToken: undefined,
  userId: undefined,
  isSuperAdmin: undefined,
};

const AuthContext = createContext({
  userToken: undefined,
  userId: undefined,
  isSuperAdmin: undefined,
  login: (userToken: string, userId: string, isSuperAdmin: boolean) => {},
  logout: () => {},
});

const authReducer: Reducer<State, Action> = (state: State, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        userId: action.payload?.userId,
        userToken: action.payload?.userToken,
        isSuperAdmin: action.payload?.isSuperAdmin
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userToken: undefined,
        userId: undefined,
        isSuperAdmin: false
      };
    }
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userToken: string, userId: string, isSuperAdmin: boolean) => {
    dispatch({
      type: "LOGIN",
      payload: { userToken, userId, isSuperAdmin },
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: { userToken: "", userId: "", isSuperAdmin: false },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userToken: state.userToken,
        userId: state.userId,
        isSuperAdmin: state.isSuperAdmin,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
