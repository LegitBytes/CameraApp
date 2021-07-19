import React, { useReducer, createContext, Reducer } from "react";

interface State {
  user: string | undefined | boolean;
  isSuperAdmin: boolean | undefined | string;
}
interface Action {
  type: "LOGIN" | "LOGOUT" | "TOGGLE SUPERADMIN";
  payload: string | boolean | undefined;
}

const initialState: State = {
  user: undefined,
  isSuperAdmin: undefined,
};

if (localStorage.getItem("isSuperAdmin")) {
  initialState.isSuperAdmin = JSON.parse(
    localStorage.getItem("isSuperAdmin") || "{}"
  );
}

const AuthContext = createContext({
  user: undefined,
  isSuperAdmin: undefined,
  login: (userData: string) => {},
  logout: () => {},
  toggleIsSuperAdmin: (currentIsSuperAdmin: boolean) => {},
});

const authReducer: Reducer<State, Action> = (state: State, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: undefined,
      };
    }
    case "TOGGLE SUPERADMIN": {
      return {
        ...state,
        isSuperAdmin: action.payload,
      };
    }
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: string) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });
  };

  const toggleIsSuperAdmin = (currentIsSuperAdmin: boolean) => {
    dispatch({
      type: "TOGGLE SUPERADMIN",
      payload: currentIsSuperAdmin,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isSuperAdmin: state.isSuperAdmin,
        login,
        logout,
        toggleIsSuperAdmin,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
