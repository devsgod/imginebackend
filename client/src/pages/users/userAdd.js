import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";

// styles
//import useStyles from "../../components/Layout/styles";
import useStyles from "../login/styles";

// components
import PageTitle from "../../components/PageTitle";

function UserAdd(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <>
    <PageTitle title="Add User" />
    <Grid container className={classes.container}>
        <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
        </Fade>
        <TextField
        id="name"
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        value={nameValue}
        onChange={e => setNameValue(e.target.value)}
        margin="normal"
        placeholder="Full Name"
        type="text"
        fullWidth
        />
        <TextField
        id="email"
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        value={loginValue}
        onChange={e => setLoginValue(e.target.value)}
        margin="normal"
        placeholder="Email Adress"
        type="email"
        fullWidth
        />
        <TextField
        id="password"
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
        />
        <div className={classes.creatingButtonContainer}>
        {isLoading ? (
            <CircularProgress size={26} />
        ) : (
            <Button
            // onClick={() =>
            //   registerUser(
            //     userDispatch,
            //     nameValue,
            //     loginValue,
            //     passwordValue,
            //     props.history,
            //     setIsLoading,
            //     setError,
            //   )
            // }
            disabled={
                loginValue.length === 0 ||
                passwordValue.length === 0 ||
                nameValue.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
            >
            Create your account
            </Button>
        )}
        </div>
    </Grid>
    </>
  );
}

export default UserAdd;
