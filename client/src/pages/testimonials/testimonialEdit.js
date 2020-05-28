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

function TestimonialEdit(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [nameValue, setNameValue] = useState("");
  var [positionValue, setPositionValue] = useState("");
  var [contentValue, setContentValue] = useState("");

  var [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
        setNameValue(props.data.name);
        setPositionValue(props.data.position);
        setContentValue(props.data.content);
        Flag.set(props.data._id);
    }
  });

    const addTestimonial = () => {
        setTimeout(() => {
            
            const data = new FormData();
            data.append('file', uploadFiles);

            const Testimonial = {
                name: nameValue,
                position: positionValue,
                content: contentValue,
                id: props.data._id,
            }
            var str = JSON.stringify(Testimonial);
            data.append('testimonial', str);

            axios.post(config.EDIT_TESTIMONIAL, data)
            .then(res => {
                setNameValue("");
                setPositionValue("");
                setContentValue("");
                setUploadFiles("");
            })
            .catch(function (error) {
            });
        }, 1000);
    }

    const fileUpload = (event) => {
        setUploadFiles(event[0]);
    }

  return (
    <>
    <PageTitle title="Add Testimonial" />
    <Grid container className={classes.container}>
        {/* <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
        </Fade> */}
        <Grid item lg={8} md={8} sm={6} xs={12}>
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
            placeholder="Name"
            type="text"
            fullWidth
            />
            <TextField
            id="price"
            InputProps={{
                classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
                },
            }}
            value={positionValue}
            onChange={e => setPositionValue(e.target.value)}
            margin="normal"
            placeholder="Position"
            type="text"
            fullWidth
            />
            <TextField
            id="content"
            InputProps={{
                classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
                },
            }}
            value={contentValue}
            onChange={e => setContentValue(e.target.value)}
            margin="normal"
            placeholder="Content"
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
                    addTestimonial()
                }
                disabled={
                    nameValue.length === 0 ||
                    positionValue.length === 0 ||
                    contentValue.length === 0
                }
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
                >
                Add your Testimonial
                </Button>
            )}
            </div>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12} className={classes.paddingImgLayout}>
            <h1>Testimonial Image</h1>
            <img src={`/${props.data.imageurl}`} alt={props.data.name} className={classes.paddingImg} />
        </Grid>
    </Grid>
    </>
  );
}

export default TestimonialEdit;
