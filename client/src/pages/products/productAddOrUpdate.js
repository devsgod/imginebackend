import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useStyles from "../../components/Layout/styles";
import axios from "axios";
import config from "../../config/config.json";

import {
    TextField,
    Grid,
    InputAdornment,
    CircularProgress} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAddOrUpdate = (props) => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [categoryId, setCategoryId] = useState('');

    const [productId, setProductId] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [ratingValue, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [uploadFiles, setUploadFiles] = useState({});

    const fileUpload = (files) => {
        console.log(files[0]);
        setUploadFiles(files[0]);
    };

    const onControl = () => {
        const data = new FormData();

        data.append('file', uploadFiles);
        const Product = {
            id : productId,
            name: productName,
            price,
            oldPrice,
            quantity,
            rating: ratingValue,
            categoryId,
            description
        };

        var str = JSON.stringify(Product);

        data.append('product', str);

        let url = '';
        if (props.bAdd === true){ // add state
            url = config.ADD_PRODUCT;
        } else {
            url = config.EDIT_PRODUCT;
        }

        axios.post(url, data)
            .then(res => {
                if (props.bAdd === true) {
                    setProductName('');
                    setPrice(0);
                    setOldPrice(0);
                    setQuantity(1);
                    setRating(0);
                    setUploadFiles({});
                    setDescription('');

                    props.onSuccess(false);

                }
                else {
                    props.onSuccess(true);
                }
            })
    };

    useEffect(() => {
        if (props.updateInfo && props.bAdd === false){
            setProductId(props.updateInfo.productId);
            setProductName(props.updateInfo.productName);
            setImageSrc(props.updateInfo.imageSrc);
            setPrice(props.updateInfo.price);
            setOldPrice(props.updateInfo.oldPrice);
            setRating(props.updateInfo.ratingValue);
            setQuantity(props.updateInfo.quantity);
            setDescription(props.updateInfo.description);
            setCategoryId(props.updateInfo.categoryId);
        }
        else if (props.updateInfo && props.bAdd === true) {
            setProductId('');
            setProductName('');
            setImageSrc('');
            setPrice(0);
            setOldPrice(0);
            setRating(0);
            setQuantity(1);
            setDescription('');
            setCategoryId(props.categories.length > 0 ? props.categories[0]._id : '') ;
        }
    }, [props.updateInfo]);

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'lg'}
                disableEscapeKeyDown={true}
                disableEnforceFocus={true}
                onClose={props.onClose}
                aria-describedby="category_description"
            >
                <DialogTitle
                    style={{textAlign : 'center', color : 'red', fontSize : '30px', paddingBottom : '20px'}}
                >
                    {props.bAdd === true ? "Add Product" : "Update Product"}</DialogTitle>
                <div>
                    <label color={'red'} style={{color : 'red'}}>{error}</label>
                </div>
                <DialogContent>
                    <Grid container spacing={1} style={{textAlign : 'center'}} alignItems={"center"} justify={"center"}>
                        <Grid item xs={12} md={props.bAdd === true ? 12 : 8} lg={props.bAdd === true ? 12 : 9}>
                            <Grid container spacing={3}>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Product Name"
                                        value={productName}
                                        type="text"
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Price"
                                        value={price}
                                        type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Old Price"
                                        value={oldPrice}
                                        type="number"
                                        onChange={(e) => setOldPrice(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Quantity"
                                        value={quantity}
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Rating"
                                        value={ratingValue}
                                        type="number"
                                        onChange={(e) => {
                                            let realValue = parseFloat(e.target.value);
                                            if (realValue < 0 || realValue > 5) {
                                                alert('Please enter value rightly!');
                                                return;
                                            }
                                            setRating(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <FormControl className={classes.categorySelect}>
                                        <InputLabel id="product_category">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            {
                                                props.categories && props.categories.map((item, id) => {
                                                    return (<MenuItem key={id} value={item._id}>{item.name}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                        <textarea
                                            style={{width : '100%', height : '100px'}}
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            props.bAdd === false &&
                            <Grid item xs={12} md={4} lg={3}>
                                <img src={`/${imageSrc}`} alt={productName} className={classes.paddingImg} />
                            </Grid>
                        }
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <DropzoneArea
                                maxFilesS
                                onChange={(e) => fileUpload(e)}
                                maxFileSize={5000000}
                                filesLimit={1}
                                dropzoneClass="MuiGrid-grid-xs-12"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{alignItems : 'center', justifyContent : 'center'}}>
                    <Button
                        onClick={onControl}
                        variant="contained"
                        color="secondary"
                        style={{width : '150px'}}
                        disabled={
                            price === '' ||
                            ratingValue === '' ||
                            productName === ''
                        }
                            color="primary">
                        {props.bAdd ? 'Save' : 'Update'}
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        style={{width : '150px'}}
                        onClick={props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductAddOrUpdate;