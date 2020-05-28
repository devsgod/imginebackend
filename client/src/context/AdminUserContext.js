import React from "react";
import axios from "axios";

import config from "../config/config.json";

var AdminUserStateContext = React.createContext();
var AdminUserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "GET_SUCCESS":
      return { ...state, user_list: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AdminUserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    user_list: {},
  });

  return (
    <AdminUserStateContext.Provider value={state}>
      <AdminUserDispatchContext.Provider value={dispatch}>
        {children}
      </AdminUserDispatchContext.Provider>
    </AdminUserStateContext.Provider>
  );
}

function useAdminUserState() {
  var context = React.useContext(AdminUserStateContext);
  if (context === undefined) {
    throw new Error("useAdminUserState must be used within a AdminUserProvider");
  }
  return context;
}

function useAdminUserDispatch() {
  var context = React.useContext(AdminUserDispatchContext);
  if (context === undefined) {
    throw new Error("useAdminUserDispatch must be used within a AdminUserProvider");
  }
  return context;
}

export { AdminUserProvider, useAdminUserState, useAdminUserDispatch, getUserList };

// ###########################################################

function getUserList(dispatch, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

    axios.get(config.ALL_USERS)
    .then(response => {
        if (response.data.length > 0) {
            dispatch({ type: 'GET_SUCCESS', payload: response.data });
            setError(null);
            setIsLoading(false);
        }
    })
    .catch((error) => {
        dispatch({ type: "GET_FAILURE" });
        setError(true);
        setIsLoading(false);
    })
}