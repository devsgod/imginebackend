import React from "react";
import axios from "axios";

import config from "../config/config.json";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "REGISTER_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      /**
       * JinZhuXian - User Login Start
       */
      axios.get(config.ALL_USERS)
      .then(response => {
        if (response.data.length > 0) {
          
          response.data.map(user => {
            if ( user.email === login && user.password === password ){
              dispatch({ type: 'LOGIN_SUCCESS' })
              history.push('/app/dashboard')
            }
          });
          
        }
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      })

      // JinZhuXian - User Login End

      // dispatch({ type: 'LOGIN_SUCCESS' })

      // history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function registerUser(dispatch, name, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password && !!name) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)

      /**
       * Jin - User Register Start
       */
      const user = {
        username: name,
        email: login,
        role: "subscriber",
        password: password,
      }

      axios.post(config.ADD_USER, user)
        .then(res => {
          dispatch({ type: 'REGISTER_SUCCESS' })
          history.push('/app/dashboard')
        })
        .catch(function (error) {
          dispatch({ type: "REGISTER_FAILURE" });
          setError(true);
          setIsLoading(false);
        });

      // Jin - User Register End

      // dispatch({ type: 'REGISTER_SUCCESS' })

      // history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "REGISTER_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
