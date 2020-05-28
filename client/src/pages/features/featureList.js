import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import FeatureEdit from "./featureEdit";
// import Feature from "../../components/Feature";
// import Table from "../dashboard/components/Table/Table";

// // data
// import mock from "../dashboard/mock";

import axios from "axios";
import config from "../../config/config.json";

//import { useAdminUserState, useAdminUserDispatch, getUserList } from "../../context/AdminUserContext";

const columns = [
  {
   name: "_id",
   label: "Id",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "title",
   label: "Title",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "description",
   label: "Description",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "imageurl",
   label: "ImageUrl",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
    name: "createdAt",
    label: "CreatedAt",
    options: {
     filter: true,
     sort: false,
    }
   },
   {
    name: "updatedAt",
    label: "UpdatedAt",
    options: {
     filter: true,
     sort: false,
    }
   },
  //  {
  //   name: "__v",
  //   label: "__v",
  //   options: {
  //    filter: true,
  //    sort: false,
  //    display: false,
  //   }
  //  },
 ];

function FeatureList() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [FeatureList, setFeatureList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(config.ALL_FEATURES)
    .then(response => {
        if (response.data.length > 0) {
          setFeatureList(response.data);
        }
    })
    .catch((error) => {

    })
  }, []);

  // const conversion = (data) => {
  //   let convertedData;
  //   if (data.length > 0){
  //     data.map(user => {

  //     })
  //   }
  //   return convertedData;
  // }

  return (
    <>
      <PageTitle title="Features" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { FeatureList ? <MUIDataTable
            title="Feature List"
            data={FeatureList}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let FeaturesArray = [];
                selectedData.data.map ( item => {
                  FeaturesArray.push(FeatureList[item.index]['_id']);
                });

                // console.log(FeaturesArray);

                axios.post(config.DELETE_FEATURE, FeaturesArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(FeatureList[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>

      {showedit ? <FeatureEdit data={selected} /> : ""}
    </>
  );
}

export default FeatureList;