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

import { DropzoneArea } from 'material-ui-dropzone';
import axios from "axios";
import config from "../../config/config.json";

// styles
import useStyles from "../../components/Layout/styles";

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

function ProductEdit(props) {
  var classes = useStyles();

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [nameValue, setNameValue] = useState("");
  var [priceValue, setPriceValue] = useState("");
  var [ratingValue, setRatingValue] = useState(0);

  var [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
      setNameValue(props.data.name);
      setPriceValue(props.data.price);
      setRatingValue(props.data.rating);
      Flag.set(props.data._id);
    }
  });

  const editProduct = () => {
    setTimeout(() => {
      const data = new FormData();
      data.append('file', uploadFiles);

      const Product = {
          id: props.data._id,
          name: nameValue,
          price: priceValue,
          rating: ratingValue,
      }
      var str = JSON.stringify(Product);
      data.append('product', str);

      axios.post(config.EDIT_PRODUCT, data)
      .then(res => {
          setNameValue("");
          setPriceValue("");
          setRatingValue(0);
      })
      .catch(function (error) {
      });
    }, 1000);
  };

  const fileUpload = (files) => {
      setUploadFiles(files[0]);
  };

  return (
    <>
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
          value={priceValue}
          onChange={e => setPriceValue(e.target.value)}
          margin="normal"
          placeholder="Price"
          type="text"
          fullWidth
          />
          <TextField
          id="rating"
          InputProps={{
              classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
              },
          }}
          value={ratingValue}
          onChange={e => setRatingValue(e.target.value)}
          margin="normal"
          placeholder="Rating"
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
                  editProduct()
              }
              disabled={
                  priceValue.length === 0 ||
                  ratingValue.length === 0 ||
                  nameValue.length === 0
              }
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.createAccountButton}
              >
              Edit your product
              </Button>
          )}
          </div>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} className={classes.paddingImgLayout}>
          <h1>Current Product</h1>
          <img src={`/${props.data.imageurl}`} alt={props.data.name} className={classes.paddingImg} />
        </Grid>
    </Grid>
    </>
  );
}

export default ProductEdit;
