import React, { useState, useEffect } from "react";
import {Grid, CircularProgress, FormControl, FormControlLabel, Tooltip, IconButton, Button} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

import axios from "axios";
import config from "../../config/config.json";

import EditIcon from '@material-ui/icons/Edit';
import ProductAddOrUpdate from "./productAddOrUpdate";


function ProductList() {

    const columns = [
        {
            name: "productId",
            label: "Id",
            options: {
                filter: true,
                sort: true,
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
            name: "imageSrc",
            label: "Product",
            options: {
                filter: true,
                sort: true,
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
            name: "oldPrice",
            label: "Old Price",
            options: {
                filter: true,
                sort: true,
                customBodyRender : (value) => {
                    return (
                        value > 0 ? value : ''
                    )
                }
            }
        },
        {
            name: "rating",
            label: "Rating",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "categoryId",
            label: "categoryId",
            options: {
                display : false
            }
        },
        {
            name: "categoryName",
            label: "Category",
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
            name: "description",
            label: "Description",
            options: {
                filter: true,
                sort: true,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <div style={{maxWidth: '300px', maxheight : '90px', margin:'0', wordWrap:'anywhere'}}>
                            {value}
                        </div>
                    )
                }
            }
        },
        {
            name: "updatedAt",
            label: "Date & Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "actionControl",
            label: "Action",
            options: {
                filter: true,
                sort: false,
                customBodyRender : (value, tableMeta) => {
                    return (
                        <Grid container spacing={0} justify={'center'} alignContent={'center'}>
                            <Grid item xs={12}>
                                <Tooltip title={"Edit"}>
                                    <IconButton onClick={() => onProductEdit(tableMeta.rowData)} color={"primary"}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    )
                }
            }
        },
    ];

  var [isLoading, setIsLoading] = useState(true);
  var [error, setError] = useState(null);
  const [OpenDialog, setOpenDialog] = useState(false);
  const [AddStatus, setAddStatus] = useState(true);
  var [productlist, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    var [categoryId, setCategoryId] = useState('');

  const [updateInfo, setUpdateInfo] = useState({});

  const onProductEdit = (rowdata) => {

      let info = {
          productId : rowdata[0],
          imageSrc : rowdata[2] ? rowdata[2] : '',
          productName : rowdata[3] ? rowdata[3] : '',
          price : rowdata[4] ? rowdata[4] : 0,
          oldPrice : rowdata[5] ? rowdata[5] : 0,
          ratingValue : rowdata[6],
          categoryId : rowdata[7],
          quantity : rowdata[9],
          description : rowdata[10] ? rowdata[10] : ''
      };

      setUpdateInfo(info);

      setAddStatus(false);
      setOpenDialog(true);
  };
  const onAddProduct = () => {
      let info = {
          productId : '',
          imageSrc : '',
          productName : '',
          price : 0,
          oldPrice : 0,
          ratingValue : 0,
          categoryId : '',
          quantity : 1,
          description : ''
      };

      setUpdateInfo(info);
      setAddStatus(true);
      setOpenDialog(true);
  };

  const onSuccess = (bClose = false) => {
      setIsLoading(true);
      axios.get(config.ALL_PRODUCTS)
          .then(response => {
              setProductList(response.data);

              setIsLoading(false);
              if (bClose === true) {
                  setOpenDialog(false);
              }
          })
          .catch((error) => {
              setIsLoading(false);
          })
  };

  useEffect(() => {
      setIsLoading(true);
    axios.get(config.ALL_PRODUCTS)
    .then(response => {
        setProductList(response.data);
        setIsLoading(false);
    })
    .catch((error) => {
        setIsLoading(false);
    })

}, []);

    useEffect(() => {
        axios.get(config.ALL_CATEGORY)
            .then(response => {
                setCategories(response.data);
                setCategoryId(response.data[0]._id);
            })
            .catch((error) => {
            });
    }, []);

  return (
    <>
      <PageTitle title="Products" />
        <div style={{float:'right'}}>
            <Button variant={"contained"} color={"primary"} onClick={onAddProduct}>Add</Button>
        </div>
        <ProductAddOrUpdate
            bAdd={AddStatus}
            open={OpenDialog}
            updateInfo={updateInfo}
            onClose={() => setOpenDialog(false)}
            categories={categories}
            onSuccess={onSuccess}
        />
      <Grid container spacing={4}>
        <Grid item xs={12}>

          { isLoading !== true ? <MUIDataTable
            title="Product List"
            data={productlist}
            columns={columns}
            options={{
              filterType: "checkbox",

              onRowsDelete: ( selectedData ) => {
                let productsArray = [];
                selectedData.data.map ( item => {
                  productsArray.push(productlist[item.dataIndex]['productId']);
                });
                axios.post(config.DELETE_PRODUCT, productsArray)
                .then(res => {
                    axios.get(config.ALL_PRODUCTS)
                        .then(response => {
                            setProductList(response.data);
                        })
                        .catch((error) => {
                        })
                })
                .catch(function (error) {
                });
              },
            }}
          /> : <CircularProgress /> }
        </Grid>
      </Grid>
    </>
  );
}

export default ProductList;