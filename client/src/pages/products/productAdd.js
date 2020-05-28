import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField, Grid, CircularProgress} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAdd = (props) => {
    var classes = useStyles();

    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState('');

    const [selectedCategoryName, setCategoryName] = useState('');

    const [productId, setProductId] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [ratingValue, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [uploadFiles, setUploadFiles] = useState([]);

    const fileUpload = (files) => {
        setUploadFiles(files[0]);
    };

    useEffect(() => {
        axios.get(config.ALL_CATEGORY)
            .then(response => {
                setCategories(response.data);
                setCategoryName(response.data[0].name);
            })
            .catch((error) => {
            });
    }, []);

    useEffect(() => {
        if (props.bAdd === false){ // update state
            setProductId(props.id);
            setProductName(props.productName);
            setImageSrc(props.imageSrc);
            setPrice(props.price);
            setOldPrice(props.oldPrice);
            setQuantity(props.quantity);
            setDescription(props.description);
        }
    }, [props]);

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.onCancel}
                aria-describedby="category_description"
            >
                <DialogTitle>{props.bAdd === true ? "Add Product" : "Update Product"}</DialogTitle>
                <div>
                    <label color={'red'} style={{color : 'red'}}>{error}</label>
                </div>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Grid container spacing={3}>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Product Name"
                                        variant={'outlined'}
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Price"
                                        variant={'outlined'}
                                        value={price}
                                        type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Old Price"
                                        variant={'outlined'}
                                        value={oldPrice}
                                        type="number"
                                        onChange={(e) => setOldPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Quantity"
                                        variant={'outlined'}
                                        value={quantity}
                                        type="number"
                                        onChange={(e) => setOldPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <TextField
                                        label="Quantity"
                                        variant={'outlined'}
                                        value={quantity}
                                        type="number"
                                        onChange={(e) => setOldPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item  xs={6} lg={3} md={4} xl={3}>
                                    <FormControl className={classes.categorySelect}>
                                        <InputLabel id="product_category">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categories}
                                            onChange={onChangeCategory}
                                        >
                                            {
                                                categories && categories.map((item, id) => {
                                                    return (<MenuItem key={id} value={item.name}>{item.name}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <Grid item xs={12}>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <DropzoneArea
                                onChange={(e) => fileUpload(e)}
                                filesLimit={1}
                                dropzoneClass="MuiGrid-grid-xs-12"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.creatingButtonContainer}>
                                {isLoading ? (
                                    <CircularProgress size={26} />
                                ) : (
                                    <Button
                                        onClick={() =>
                                            addProduct()
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
                                        {props.bAdd === true ? 'Add your product' : 'Update your product'}
                                    </Button>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onSave} color="primary">
                        {props.saveTitle}
                    </Button>
                    <Button onClick={props.onCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductAdd;