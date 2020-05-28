import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import UserCard from "./userCard";
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
   name: "username",
   label: "Username",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "firstName",
   label: "First Name",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "lastName",
   label: "Last Name",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "mobile",
   label: "Phone",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "signupStatus",
   label: "Register Status",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "msg",
   label: "Register Message",
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

function TestDrive() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [userlist, setUserList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  // global
  // var userState = useAdminUserState();
  // var userDispatch = useAdminUserDispatch();
  // console.log("asdf", userState);

  useEffect(() => {
   // getUserList(userDispatch, setIsLoading, setError);
    axios.get(config.ALL_USERS)
    .then(response => {
        if (response.data.length > 0) {
          setUserList(response.data);
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

  //function(rowsDeleted: object(lookup: {[dataIndex]: boolean}, data: arrayOfObjects: {index: number, dataIndex: number}))

  return (
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { userlist ? <MUIDataTable
            title="Employee List"
            data={userlist}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let userArray = [];
                selectedData.data.map ( item => {
                  userArray.push(userlist[item.index]['_id']);
                });

                console.log(userArray);

                axios.post(config.DELETE_USER, userArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(userlist[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>
      {showedit ? <UserCard data={selected} /> : ""}
    </>
  );
}

export default TestDrive;