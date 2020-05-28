import React, { useState, useEffect } from "react";
import {Grid, CircularProgress, FormControl, FormControlLabel, Tooltip, IconButton, Button} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

import axios from "axios";
import config from "../../config/config.json";
import EditIcon from '@material-ui/icons/Edit';
import CategoryAdd from "./categoryAdd";

function CategoryList() {

    const columns = [
        {
            name: "_id",
            label: "ID",
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
                filter: true,
                sort: true,
                customBodyRender : (value, tableMeta) => {
                    return (
                        tableMeta.rowIndex + 1
                    )
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
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
                                    <IconButton color={"primary"} onClick={() => onOpenDialog(false, tableMeta)}>
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

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [openAddDlg, setOpenDialog] = useState(false);
    const [bAdd, setAddStatus] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    const onOpenDialog = (bAdd, tableData = null) => {

        if (bAdd === false) {
            setSelectedCategoryId(tableData.rowData[0]);
            setSelectedCategoryName(tableData.rowData[2]);
        }
        else {
            setSelectedCategoryId('');
            setSelectedCategoryName('');
        }

        setAddStatus(bAdd);
        setOpenDialog(true);
    };

    const onSaveDlgCategory = () => {

        const Category = {
            _id: selectedCategoryId,
            name: selectedCategoryName,
        };

        if (bAdd === true) {
            // add category
            axios.post(config.ADD_CATEGORY, Category)
                .then(res => {
                    if (res.data.error) {
                        setError(res.data.error);
                        setSelectedCategoryId("");
                        setSelectedCategoryName("");
                    }
                    else {
                        setSelectedCategoryId("");
                        setSelectedCategoryName("");
                        setOpenDialog(false);

                        FetchAllData();

                    }
                })
                .catch(function (error) {
                });
        }
        else {

            axios.post(config.EDIT_CATEGORY, Category)
                .then(res => {
                    if (res.data.error) {
                        setError(res.data.error);
                        setSelectedCategoryId("");
                        setSelectedCategoryName("");
                    }
                    else {
                        setSelectedCategoryId("");
                        setSelectedCategoryName("");
                        setOpenDialog(false);

                        FetchAllData();
                    }
                })
                .catch(function (error) {
                });
            // update category
        }

    };

    const FetchAllData = () => {
        axios.get(config.ALL_CATEGORY)
            .then(response => {
                setCategoryList(response.data);
            })
            .catch((error) => {
            });

    };

    const onCancelDlgCategory = () => {
        setError('');
        setOpenDialog(false);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(config.ALL_CATEGORY)
            .then(response => {
                setCategoryList(response.data);
                setLoading(false);

                // if (response.data.length > 0) {
                //     setCategoryList(response.data);
                // }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <PageTitle title="Categories" />
            <div style={{float:'right'}}>
                <Button variant={"contained"} color={"primary"} onClick={() => onOpenDialog(true)}>Add</Button>
            </div>
            <CategoryAdd
                open={openAddDlg}
                title={bAdd ? 'Add Category' : 'Edit Category'}
                saveTitle={bAdd ? 'Add' : 'Update'}
                value={selectedCategoryName}
                onChange={(event) => {
                    setError('');
                    setSelectedCategoryName(event.target.value)
                }}
                error={error}
                onSave={() => onSaveDlgCategory(selectedCategoryName)}
                onCancel={() => onCancelDlgCategory()}
            />
            <Grid container spacing={4}>
                <Grid item xs={12}>

                    { loading !== true ? <MUIDataTable
                        title="Category List"
                        data={categoryList}
                        columns={columns}
                        options={{
                            filterType: "checkbox",

                            onRowsDelete: ( selectedData ) => {
                                let productsArray = [];
                                selectedData.data.map ( item => {
                                    productsArray.push(categoryList[item.dataIndex]['_id']);
                                });
                                axios.post(config.DELETE_CATEGORY, productsArray)
                                    .then(res => {
                                        FetchAllData();
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

export default CategoryList;