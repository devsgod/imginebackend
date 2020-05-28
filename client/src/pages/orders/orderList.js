import React, { useState, useEffect } from "react";
import {
    Grid,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Tooltip,
    IconButton,
    Button,
    createMuiTheme, Switch
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {Visibility} from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle";

import axios from "axios";
import config from "../../config/config.json";

import DeleteIcon from '@material-ui/icons/Delete';
import ProductAddOrUpdate from "../products/productAddOrUpdate";
import BuyerInfo from "./buyerInfo";
import CartDataDialog from "./cartDataDialog";

function OrderList() {

    const columns = [
        {
            name: "_id",
            label: "ID",
            options: {
                display : false
            }
        },
        {
            name: "no",
            label: "No",
            options: {
                filter: false,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        tableMeta.rowIndex + 1
                    )
                }
            }
        },
        {
            name : 'dataIndex',
            label : "Index",
            options : {
                filter : true,
                sort : true,
                display : false
            }
        },
        {
            name : 'shipping',
            label : "Shipping",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name : 'taxi',
            label : "Taxi",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "total",
            label: "Total Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "createdAt",
            label: "Order Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "payment",
            label: "Payment",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "viewCartData",
            label: "Order Detail",
            options: {
                filter: true,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'} justify={'center'}>
                            <Tooltip title={"View Order Detail"}>
                                <IconButton color={"primary"} onClick={() => onShowOrderDetail(tableMeta.rowData)}>
                                    <Visibility/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )
                }
            },
        },
        {
            name: "viewBuyerInfo",
            label: "Buyer Info",
            options: {
                filter: true,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'} justify={'center'}>
                            <Tooltip title={"View Buyer Info"}>
                                <IconButton color={"secondary"} onClick={() => onShowBuyerInfo(tableMeta.rowData)}>
                                    <Visibility/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )
                }
            },
        },
        {
            name: "status",
            label: "Check",
            options: {
                filter: true,
                sort: true,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'} justify={'center'}>
                            <FormControlLabel
                                onChange={(e) => {onSetChecked(e.target.checked, tableMeta.rowData)}}
                                checked={value === 'Process order' ? false : true}
                                control={<Switch color="primary" />}
                            />
                        </Grid>
                    )
                }
            }
        },
        {
            name: "delete",
            label: "Delete",
            options: {
                filter: true,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'} justify={'center'}>
                            <Tooltip title={"Delete"}>
                                <IconButton color="inherit" onClick={() => onDeleteRow(tableMeta.rowData)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )
                }
            },
        },

    ];

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [openBuyInfo, setOpenBuyInfo] = useState(false);
    const [openCartData, setOpenCartData] = useState(false);

    const [orders, setOrders] = useState([]);

    const [buyerInfo, setBuyerInfo] = useState({});
    const [cartData, setCartData] = useState({});

    const onSetChecked = (bSetValue, rowData) => {
        let orderId = rowData[0];
        let index = rowData[2];

        let sendData = {
            id : orderId,
            setValue : bSetValue
        };

        axios.post(config.CHANGE_ORDER_SET, sendData)
            .then(res => {
                if (res.status === 200) {
                    FetchAllData();
                }
            })
            .catch(function (error) {
            });
    };

    const onDeleteRow = (rowData) => {
        let orderId = rowData[0];

        let value = window.confirm('Really Delete?');

        if (value === true) {
            // delete
            let deleteIds = [];
            deleteIds.push(orderId);

            axios.post(config.DELETE_ORDER_ROW, deleteIds)
                .then(res => {
                    FetchAllData();
                })
                .catch(function (error) {
                });
        }
    };

    const onShowBuyerInfo = (rowData) => {
        let dataIndex = rowData[2];

        let selectedData = orders[dataIndex];
        console.log(selectedData);
        //
        setBuyerInfo(selectedData.buyerInfo);
        setOpenBuyInfo(true);
    };

    const onShowOrderDetail = (rowData) => {
        let dataIndex = rowData[2];

        let selectedData = orders[dataIndex];

        console.log(selectedData);
        //
        setCartData(selectedData.cartData);

        setOpenCartData(true);
    };

    const FetchAllData = () => {
        axios.get(config.ALL_ORDERS)
            .then(response => {
                // setOrders(response.data);
                let orderList = response.data;
                let tempData = {};

                for (let i = 0; i < orderList.length; i++) {
                    tempData = orderList[i];
                    orderList[i]['dataIndex'] = i;
                }
                setOrders(orderList);
            })
            .catch((error) => {
            });
    };

    const onCancelDlgCategory = () => {
        setError('');
        setOpenBuyInfo(false);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(config.ALL_ORDERS)
            .then(response => {
                // setOrders(response.data);
                let orderList = response.data;
                let tempData = {};
                console.log(orderList);

                for (let i = 0; i < orderList.length; i++) {
                    tempData = orderList[i];
                    orderList[i]['dataIndex'] = i;
                }
                setOrders(orderList);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <PageTitle title="Orders" />
            <BuyerInfo
                open={openBuyInfo}
                buyerInfo={buyerInfo}
                onClose={() => setOpenBuyInfo(false)}
            />
            <CartDataDialog
                open={openCartData}
                cartData={cartData}
                onClose={() => setOpenCartData(false)}
            />
            <Grid container spacing={4}>
                <Grid item xs={12}>

                    { loading !== true ? <MUIDataTable
                        title="Order List"
                        data={orders}
                        columns={columns}
                        options={{
                            filterType: "checkbox",
                            responsive : "scrollMaxHeight",
                            onRowsDelete: ( selectedData ) => {
                                let productsArray = [];
                                console.log(orders);
                                selectedData.data.map ( item => {
                                    productsArray.push(orders[item.dataIndex]['_id']);
                                });
                                let value = window.confirm('Really Delete?');

                                if (value === true) {
                                    axios.post(config.DELETE_ORDER_ROW, productsArray)
                                        .then(res => {
                                            FetchAllData();
                                        })
                                        .catch(function (error) {
                                        });
                                }
                            },
                        }}
                    /> : <CircularProgress /> }
                </Grid>
            </Grid>
        </>
    );
}

export default OrderList;