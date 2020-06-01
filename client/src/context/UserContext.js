import React from "react";
import axios from "axios";

import config from "../config/config.json";
// import config from "../config/config_local.json";

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
      // throw new Error(`Unhandled action type: ${action.type}`);
      alert("Login Failed");
      return { ...state, isAuthenticated: false };
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
      setError(null)
      setIsLoading(false)
      /**
       * JinZhuXian - User Login Start
       */
      var admin_data = { email:login, password }
      axios.post(config.USER_AUTH, admin_data)
      .then(response => {
        if (response.data) {
          console.log(response.data)
            localStorage.setItem('id_token', response.data.token)
            dispatch({ type: 'LOGIN_SUCCESS' })
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
          console.log(res.data);
          if (res.data.msg == 'success'){
            dispatch({ type: 'REGISTER_SUCCESS' })
            localStorage.setItem('id_token', 1)
            history.push('/app/dashboard')
          }          
        })
        .catch(function (error) {
          // dispatch({ type: "REGISTER_FAILURE" });
          alert("Register Failed");
          console.log(error);
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
