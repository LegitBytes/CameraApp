import React, { useReducer, createContext } from "react";

const initialState = {
  dark: false,
};

if (localStorage.getItem("darkTheme")) {
  initialState.dark = JSON.parse(localStorage.getItem("darkTheme"));
}

const ThemeContext = createContext({
  dark: false,
  toggle: () => {},
});

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      return {
        ...state,
        dark: !state.dark,
      };
    }
    default:
      return state;
  }
}

function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggle = () => {
    localStorage.setItem("darkTheme", JSON.stringify(!state.dark));
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <ThemeContext.Provider value={{ dark: state.dark, toggle }} {...props} />
  );
}

export { ThemeContext, ThemeProvider };
