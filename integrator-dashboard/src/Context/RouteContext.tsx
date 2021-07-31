import React, { useReducer, createContext, Reducer } from "react";

interface State {
  inMemRoute: string;
}
interface Action {
  type: "SET" | "RESET";
  payload: string;
}

const initialState: State = {
  inMemRoute: "/",
};

let lastRoute = process.env.REACT_APP_LAST_ROUTE || "lastRoute"

if (localStorage.getItem(lastRoute)) {
  initialState.inMemRoute = localStorage.getItem(lastRoute) || "";
}

const RouteContext = createContext({
  inMemRoute: "",
  setRoute: (lastRoute: string) => {},
  resetRoute: () => {},
});

const routeReducer: Reducer<State, Action> = (state: State, action) => {
  switch (action.type) {
    case "SET": {
      return {
        ...state,
        inMemRoute: action.payload,
      };
    }
    case "RESET": {
      return {
        ...state,
        inMemRoute: "/",
      };
    }
    default:
      return state;
  }
};

function RouteProvider(props) {
  const [state, dispatch] = useReducer(routeReducer, initialState);

  const setRoute = (lastRouteParam) => {
    localStorage.setItem(lastRoute, lastRouteParam);
    dispatch({
      type: "SET",
      payload: lastRouteParam,
    });
  };

  const resetRoute = () => {
    localStorage.removeItem(lastRoute);
    dispatch({
      type: "RESET",
      payload: "",
    });
  };

  return (
    <RouteContext.Provider
      value={{
        inMemRoute: state.inMemRoute,
        setRoute,
        resetRoute,
      }}
      {...props}
    />
  );
}

export { RouteContext, RouteProvider };
