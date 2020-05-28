import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import WidgetEdit from "./widgetEdit";
// import Widget from "../../components/Widget";
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

function WidgetList() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [Widgetlist, setWidgetList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(config.ALL_WIDGETS)
    .then(response => {
        if (response.data.length > 0) {
          setWidgetList(response.data);
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
      <PageTitle title="Widgets" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { Widgetlist ? <MUIDataTable
            title="Widget List"
            data={Widgetlist}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let WidgetsArray = [];
                selectedData.data.map ( item => {
                  WidgetsArray.push(Widgetlist[item.index]['_id']);
                });

                // console.log(WidgetsArray);

                axios.post(config.DELETE_WIDGET, WidgetsArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(Widgetlist[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>

      {showedit ? <WidgetEdit data={selected} /> : ""}
    </>
  );
}

export default WidgetList;