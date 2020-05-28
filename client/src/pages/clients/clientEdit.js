import React, { useState, useEffect } from "react";
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

// for static variable
class Flag {
    constructor() {
        this.id = -1;
    }
    static set(id) {
        this.id = id;
    }
    static get() {
        return this.id;
    }
}

function ClientEdit(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [descriptionValue, setDescriptionValue] = useState("");

  var [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
        setDescriptionValue(props.data.description);
        Flag.set(props.data._id);
    }
  });

    const addClient = () => {
        setTimeout(() => {

            const data = new FormData();
            data.append('file', uploadFiles);

            const Client = {
              description: descriptionValue,
              id: props.data._id,
            }
            var str = JSON.stringify(Client);
            data.append('client', str);

            axios.post(config.EDIT_CLIENT, data)
            .then(res => {
                setDescriptionValue("");
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
    <PageTitle title="Add Client" />
    <Grid container className={classes.container}>
        {/* <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
        </Fade> */}
        <Grid item lg={8} md={8} sm={6} xs={12}>
            <TextField
            id="description"
            InputProps={{
                classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
                },
            }}
            value={descriptionValue}
            onChange={e => setDescriptionValue(e.target.value)}
            margin="normal"
            placeholder="Description"
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
                    addClient()
                }
                disabled={
                    descriptionValue.length === 0
                }
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
                >
                Add your Client
                </Button>
            )}
            </div>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} className={classes.paddingImgLayout}>
            <h1>Client Image</h1>
            <img src={`/${props.data.imageurl}`} alt={props.data.id} className={classes.paddingImg} />
        </Grid>
    </Grid>
    </>
  );
}

export default ClientEdit;
