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
  Select,
  MenuItem
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

function BlogEdit(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [titleValue, setTitleValue] = useState("");
  var [authorValue, setAuthorValue] = useState("");
  var [categoryValue, setCategoryValue] = useState("");
  var [textValue, setTextValue] = useState("");

  var [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
        setTitleValue(props.data.title);
        setAuthorValue(props.data.author);
        setCategoryValue(props.data.category);
        setTextValue(props.data.text);
        Flag.set(props.data._id);
    }
  });

    const addBlog = () => {
        setTimeout(() => {
            const data = new FormData();
            data.append('file', uploadFiles);

            const Blog = {
              title: titleValue,
              author: authorValue,
              category: categoryValue,
              text: textValue,
              id: props.data._id,
            }
            var str = JSON.stringify(Blog);
            data.append('blog', str);

            axios.post(config.EDIT_BLOG, data)
            .then(res => {
                setTitleValue("");
                setAuthorValue("");
                setCategoryValue("");
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
    <PageTitle title="Edit Blog" />
    <Grid container className={classes.container}>
        {/* <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
        </Fade> */}
        <Grid item lg={8} md={8} sm={6} xs={12}>
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
            id="author"
            InputProps={{
                classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
                },
            }}
            value={authorValue}
            onChange={e => setAuthorValue(e.target.value)}
            margin="normal"
            placeholder="Author"
            type="text"
            fullWidth
            />           
            <Select
                id="category"
                margin="normal"
                style={{width:"400px"}}
                value={categoryValue}
                onChange={e => setCategoryValue(e.target.value)}
                displayEmpty={false}
                //   className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value={"retail"}>Retail</MenuItem>
                <MenuItem value={"restaurants"}>Restaurant</MenuItem>
                <MenuItem value={"education"}>Education</MenuItem>
                <MenuItem value={"corporate"}>Corporate</MenuItem>
                <MenuItem value={"hospitality"}>Hospitality</MenuItem>
                <MenuItem value={"healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"gambling"}>Gambling</MenuItem>
                <MenuItem value={"outdoor"}>Outdoor</MenuItem>
            </Select>
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
            // type="text"
            multiline
            rowsMax="100"
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
                    addBlog()
                }
                disabled={
                    titleValue.length === 0 ||
                    authorValue.length === 0 ||
                    textValue.length === 0
                }
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
                >
                Edit your blog
                </Button>
            )}
            </div>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12} className={classes.paddingImgLayout}>
            <h1>Blog Image</h1>
            <img src={`/${props.data.imageurl}`} alt={props.data.title} className={classes.paddingImg} />
        </Grid>
    </Grid>
    
    </>
  );
}

export default BlogEdit;
