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
// import config from "../../config/config_local.json";

//import { useAdminUserState, useAdminUserDispatch, getUserList } from "../../context/AdminUserContext";

const columns = [
  // {
  //  name: "_id",
  //  label: "Id",
  //  options: {
  //   filter: true,
  //   sort: true,
  //  }
  // },
  {
   name: "name",
   label: "Username",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "email",
   label: "Email",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "subject",
   label: "Subject",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
    name: "phone",
    label: "Phone",
    options: {
     filter: true,
     sort: false,
    }
   },
  {
    name: "message",
    label: "Message",
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

function UserContact() {

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
    axios.get(config.ALL_CONTACTS)
    .then(response => {
      console.log(response.data)
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
      <PageTitle title="Contact" />
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

                axios.post(config.DELETE_CONTACTS, userArray)
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

export default UserContact;