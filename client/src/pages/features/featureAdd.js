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
import useStyles from "../../components/Layout/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import axios from "axios";
import config from "../../config/config.json";

import { DropzoneArea } from 'material-ui-dropzone'

function FeatureAdd(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [titleValue, setTitleValue] = useState("");
  var [textValue, setTextValue] = useState("");

  var [uploadFiles, setUploadFiles] = useState([]);

    const addFeature = () => {
        setTimeout(() => {
            const data = new FormData();
            data.append('file', uploadFiles);

            const Feature = {
              title: titleValue,
              text: textValue,
            }
            var str = JSON.stringify(Feature);
            data.append('feature', str);

            axios.post(config.ADD_FEATURE, data)
            .then(res => {
                setTitleValue("");
                setTextValue("");
                setUploadFiles("");
            })
            .catch(function (error) {
            });
        }, 1000);
    }

    const fileUpload = (files) => {
        setUploadFiles(files[0]);
    }

  return (
    <>
    <PageTitle title="Add Feature" />
    <Grid container className={classes.container}>
        <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
        </Fade>
        <TextField
        id="title"
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        value={titleValue}
        onChange={e => setTitleValue(e.target.value)}
        margin="normal"
        placeholder="Title"
        type="text"
        fullWidth
        />
        <TextField
        id="text"
        InputProps={{
            classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
            },
        }}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        margin="normal"
        placeholder="Text"
        type="text"
        fullWidth
        />

        <DropzoneArea 
            onChange={e => fileUpload(e)}
            filesLimit={1}
        />


        <div className={classes.creatingButtonContainer}>
        {isLoading ? (
            <CircularProgress size={26} />
        ) : (
            <Button
            onClick={() =>
                addFeature()
            }
            disabled={
                titleValue.length === 0 ||
                textValue.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
            >
            Add your Feature
            </Button>
        )}
        </div>
    </Grid>
    </>
  );
}

export default FeatureAdd;
