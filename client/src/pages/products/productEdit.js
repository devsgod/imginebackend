import React, { useState, useEffect } from "react";
import {
    Grid,
    CircularProgress,
    Button,
    TextField,
    InputLabel, Select, MenuItem, FormControl,
} from "@material-ui/core";

import NumberFormat from 'react-number-format';

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
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    var [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [productName, setNameValue] = useState("");
  const [price, setPriceValue] = useState("");
  const [oldPrice, setOldPriceValue] = useState('');
  const [quantity, setQuantityValue] = useState(1);

  const [ratingValue, setRatingValue] = useState(0);

  const [description, setDescription] = useState('');
  const [uploadFiles, setUploadFiles] = useState([]);

    const onChangeCategory = (event) => {
        setSelectedCategoryName(event.target.value);
    };

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
      setNameValue(props.data.name);
      setPriceValue(props.data.price);

      setOldPriceValue(props.data.oldPrice);
      setQuantityValue(props.data.quantity);
      setRatingValue(props.data.rating);

      setSelectedCategoryName(props.data.categoryName);
        setCategories(props.categories);
        setDescription(props.data.description);
      Flag.set(props.data._id);
    }
  });

  const onChangeDescription = (event) => {
      setDescription(event.target.value);
  };

  const editProduct = () => {
    setTimeout(() => {
      const data = new FormData();
      data.append('file', uploadFiles);

      const Product = {
          id: props.data._id,
          name: productName,
          price: price,
          oldPrice : oldPrice,
          quantity : quantity,
          categoryName : selectedCategoryName,
          rating: ratingValue,
          description
      };
      var str = JSON.stringify(Product);
      data.append('product', str);

      axios.post(config.EDIT_PRODUCT, data)
      .then(res => {
          setNameValue("");
          setPriceValue("");
          setOldPriceValue('');
          setRatingValue(0);
          setDescription('');
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
              label="product name"
          id="name"
          InputProps={{
              classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
              },
          }}
          value={productName}
          onChange={e => setNameValue(e.target.value)}
          margin="normal"
          type="text"
          fullWidth
          />
          <TextField
          id="price"
          label="price"
          InputProps={{
              classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
              },
          }}
          value={price}
          onChange={e => setPriceValue(e.target.value)}
          type='number'
          margin="normal"
          fullWidth
          />
            <TextField
                label="old price"
                id="old_price"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={oldPrice}
                onChange={e => setOldPriceValue(e.target.value)}
                margin="normal"
                type="number"
                fullWidth
            />
            <TextField
                label="quantity"
                id="quantity"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={quantity}
                onChange={e => setQuantityValue(e.target.value)}
                margin="normal"
                type="number"
                fullWidth
            />
          <TextField
          id="rating"
          label='rating'
          InputProps={{
              classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField,
              },
          }}
          value={ratingValue}
          onChange={e => setRatingValue(e.target.value)}
          margin="normal"
          type="number"
          fullWidth
          />
            <FormControl className={classes.categorySelect}>
                <InputLabel id="product_category">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategoryName}
                    onChange={onChangeCategory}
                >
                    {
                        categories.map(item => {
                            return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                        })
                    }
                </Select>
            </FormControl>
            <textarea
                style={{width:'100%', height : '100px'}}
                placeholder="Description"
                value={description}
                onChange={onChangeDescription}
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
                  price.length === 0 ||
                  ratingValue.length === 0 ||
                  productName.length === 0
              }
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.createAccountButton}
              >
              Update your product
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
