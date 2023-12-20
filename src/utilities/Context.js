import React, { useReducer, useEffect, useContext } from "react";
import { reducer } from "./reducer";
import { products, fet } from "./data";
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();
const defaultstate = {
  alert: {
    alertType: "",
    alertMessage: "",
    alertCondition: false,
  },
  updateCondition: false,
  loggedInUser: {},
  isUserLogged: false,
  loading: false,
  personDetails: [],
  fewProducts: fet,
  allProducts: products,
  orderList: []
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultstate);
  const getProducts = async () => {
    dispatch({ type: "START-LOADING" });
    const response = await fetch(url);
    dispatch({ type: "END-LOADING" });
  };
  const loginCart = () => {
    dispatch({ type: "LOGIN-CART" });
  };
  const signedOut = () => {
    dispatch({ type: "SIGNED-OUT" });
  };
  const updateConditionFn = () => {
    dispatch({ type: "CHANGE-COND" });
  };
  const closeAlert = () => {
    dispatch({ type: "CLOSE-ALERT" });
  };
  const updateInformation = () => {
    dispatch({ type: "UPDATE-INFORMATION" });
  };
  const updateValues = () => {
    dispatch({ type: "GET_TOTALS" });
  };
  const unmatchingPassword = () => {
    dispatch({ type: "UNMATCHING-PASSWORD" });
  };
  const notFilledAll = () => {
    dispatch({ type: "MISSING-INFO" });
  };
  const wrongCredt = () => {
    dispatch({ type: "WRONG-CRED" });
  };
  const noUsersAtAll = () => {
    dispatch({ type: "NO-USERS" });
  };
  const signedUp = () => {
    dispatch({ type: "SIGNED-UP" });
  };
  const signedIn = () => {
    dispatch({ type: "SIGNED-IN" });
  };
  useEffect(() => {
    updateValues();
    updateInformation();
  }, [state.updateCondition]);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        closeAlert,
        unmatchingPassword,
        notFilledAll,
        wrongCredt,
        noUsersAtAll,
        signedUp,
        signedIn,
        updateConditionFn,
        signedOut,
        loginCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
