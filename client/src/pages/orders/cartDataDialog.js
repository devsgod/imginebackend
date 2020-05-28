import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
    FormControlLabel, Switch,
} from "@material-ui/core";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useStyles from "../../components/Layout/styles";
import axios from "axios";
import config from "../../config/config.json";

import {
    Grid,
    } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CartDataDialog = (props) => {

    const columns = [
        {
            name: "no",
            label: "No",
            options: {
                customBodyRender : (value, tableMeta) => {
                    return(
                        tableMeta.rowIndex + 1
                    )
                }
            }
        },
        {
            name: "index",
            label : "Index",
            options: {
                display : false
            }
        },
        {
            name : "imageSrc",
            label : 'Product',
            options : {
                customBodyRender : (value, tableMeta) => {
                    return (
                        <div style={{width : '100px', height : '100px', textAlign : 'center', alignItems : 'center', justifyContent : 'center'}}>
                            {
                                value ?
                                    <img src={value} align={""} style={{width: '100%', height : 'auto'}}/>
                                    : <div style={{paddingTop: '40px'}}>No image</div>
                            }
                        </div>
                    )
                }
            }
        },
        {
            name: "productName",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "quantity",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "subTotal",
            label: "Line Total",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "checked",
            label: "Check State",
            options: {
                filter: true,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={0} justify={'center'} alignContent={'center'}>
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems={'center'} justify={'center'}>
                                    <FormControlLabel
                                        defaultChecked={value}
                                        control={<Switch color="primary" />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            }
        },
    ];

    const [cartData, setCartData] = useState([]);
    //
    useEffect(() => {
        if (props.cartData){
            let keys = Object.keys(props.cartData);
            let realData = [];
            if (keys.length > 0) {
              for (let i = 0; i < keys.length; i++ ){
                  let tempData = props.cartData[keys[i]];
                  tempData['productId'] = keys[i];
                  tempData['index'] = i;
                  tempData['subTotal'] = tempData['price'] * tempData['quantity'];
                  realData.push(tempData);
              }
            }

            setCartData(realData);
        }
    }, [props.cartData]);

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
                    Order Detail
                </DialogTitle>
                <DialogContent>
                    <MUIDataTable
                        title="Order List"
                        data={cartData}
                        columns={columns}
                        options={{
                            responsive : "scrollMaxHeight",
                            selectableRowsHeader : false,
                        }}
                    />
                </DialogContent>
                <DialogActions style={{alignItems : 'center', justifyContent : 'center'}}>
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

export default CartDataDialog;