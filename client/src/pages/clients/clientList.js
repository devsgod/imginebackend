import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import ClientEdit from "./clientEdit";
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

function ClientList() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [Clientlist, setClientList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(config.ALL_CLIENTS)
    .then(response => {
        if (response.data.length > 0) {
          setClientList(response.data);
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
      <PageTitle title="Clients" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { Clientlist ? <MUIDataTable
            title="Client List"
            data={Clientlist}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let ClientsArray = [];
                selectedData.data.map ( item => {
                  ClientsArray.push(Clientlist[item.index]['_id']);
                });

                console.log(ClientsArray);

                axios.post(config.DELETE_CLIENT, ClientsArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(Clientlist[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>

      {showedit ? <ClientEdit data={selected} /> : ""}
    </>
  );
}

export default ClientList;