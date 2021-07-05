import React, { useReducer, createContext } from "react";
import { TransitionLeft, TransitionProps } from "../Shared/Slides";

interface State {
  transition: (props: TransitionProps) => JSX.Element;
  open: boolean;
  alertHorizontal: "left" | "right" | "center";
  alertVertical: "top" | "bottom"; 
  message: string;
}

interface Action {
  type: string;
  payload: State;
}

export interface alertArgs {
  transition: (props: TransitionProps) => JSX.Element;
  alertHorizontal: "left" | "right" | "center";
  alertVertical: "top" | "bottom";
  message: string;
}

const initialState: State = {
  transition: TransitionLeft,
  open: false,
  alertHorizontal: "left",
  alertVertical: "bottom",
  message: "",
};

const AlertContext = createContext({
  alertDetails: initialState,
  handleOpen: (alertDetails) => {},
  handleClose: () => {},
});

const AlertReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN": {
      return {
        ...state,
        open: true,
        transition: action.payload.transition,
        alertHorizontal: action.payload.alertHorizontal,
        alertVertical: action.payload.alertVertical,
        message: action.payload.message,
      };
    }
    case "CLOSE": {
      return {
        ...state,
        open: false,
        transition: action.payload.transition,
        alertHorizontal: action.payload.alertHorizontal,
        alertVertical: action.payload.alertVertical,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
};

const AlertProvider = (props) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const handleOpen = (alertData: State) => {
    dispatch({
      type: "OPEN",
      payload: alertData,
    });
    return
  };

  const handleClose = () => {
    dispatch({
      type: "CLOSE",
      payload: {
        transition: TransitionLeft,
        open: false,
        alertHorizontal: "left",
        alertVertical: "bottom",
        message: "",
      },
    });
    return
  };

  return (
    <AlertContext.Provider
      value={{ alertDetails: state, handleClose, handleOpen }}
      {...props}
    />
  );
};

export { AlertContext, AlertProvider };
