import React, {useEffect, useState} from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Fade, TextareaAutosize,
} from "@material-ui/core";

// styles
import useStyles from "../../components/Layout/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import axios from "axios";
import config from "../../config/config.json";

import { DropzoneArea } from 'material-ui-dropzone'

function ProductAdd(props) {
  var classes = useStyles();

  const [categories, setCategories] = useState([]);
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [selectedCategoryName, setCategoryName] = useState('');

  const [productName, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [oldPriceValue, setOldPriceValue] = useState(0);
  const [quantity, setQuantityValue] = useState(1);
  const [ratingValue, setRatingValue] = useState(0);
  const [description, setDescription] = useState('');
  const [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
      axios.get(config.ALL_CATEGORY)
          .then(response => {
              setCategories(response.data);
              setCategoryName(response.data[0].name);
              // if (response.data.length > 0) {
              //     setCategoryList(response.data);
              // }
          })
          .catch((error) => {
          });
  }, []);

    const addProduct = () => {
        setTimeout(() => {
            const data = new FormData();

            data.append('file', uploadFiles);

            const Product = {
                name: productName,
                price: priceValue,
                oldPrice : oldPriceValue,
                quantity : quantity,
                rating: ratingValue,
                categoryName : selectedCategoryName,
                description : description
            };
            var str = JSON.stringify(Product);
            data.append('product', str);

            axios.post(config.ADD_PRODUCT, data)
            .then(res => {
                setNameValue("");
                setPriceValue("");
                setOldPriceValue('');
                setQuantityValue(1);
                setRatingValue(0);
                setUploadFiles([]);
                setDescription('');
            })
            .catch(function (error) {
            });
        }, 1000);
    };

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const onChangeCategory = (event) => {
        setCategoryName(event.target.value);
    };

    const fileUpload = (files) => {
        setUploadFiles(files[0]);
    };

  return (
    <>
    <PageTitle title="Add Product" />
    <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
            Something is wrong with your login or password :(
        </Typography>
    </Fade>
    <Grid container spacing={4} className={classes.container}>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <TextField
                id="name"
                label="Product Name"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={productName}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Name"
                type="text"
                fullWidth
            />
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <TextField
                id="price"
                label="Price"
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
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <TextField
                id="oldPrice"
                label="Old Price"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                value={oldPriceValue}
                onChange={e => setOldPriceValue(e.target.value)}
                margin="normal"
                type="number"
                fullWidth
            />
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <TextField
                id="quantity"
                label="Quantity"
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
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <TextField
                id="rating"
                label="rating"
                InputProps={{
                    classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                    },
                }}
                onChange={e => setRatingValue(e.target.value)}
                margin="normal"
                placeholder="Rating"
                type="number"
                fullWidth
            />
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl={3}>
            <FormControl className={classes.categorySelect}>
                <InputLabel id="product_category">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategoryName}
                    onChange={onChangeCategory}
                >
                    {
                        categories.map((item, id) => {
                            return (<MenuItem key={id} value={item.name}>{item.name}</MenuItem>);
                        })
                    }
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
            <textarea
                style={{width : '100%', height : '100px'}}
                placeholder="Description"
                aria-label="maximum height"
                onChange={onChangeDescription}
            />
        </Grid>

        <DropzoneArea
            onChange={e => fileUpload(e)}
            filesLimit={1}
            dropzoneClass="MuiGrid-grid-xs-12"
        />

        <div className={classes.creatingButtonContainer}>
        {isLoading ? (
            <CircularProgress size={26} />
        ) : (
            <Button
            onClick={() =>
                addProduct()
            }
            disabled={
                priceValue.length === 0 ||
                ratingValue.length === 0 ||
                productName.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
            >
            Add your product
            </Button>
        )}
        </div>
    </Grid>
    </>
  );
}

export default ProductAdd;
