import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import BlogEdit from "./blogEdit";
// import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";

// // data
// import mock from "../dashboard/mock";

import axios from "axios";
import config from "../../config/config.json";

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
   name: "title",
   label: "Title",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "author",
   label: "Author",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "category",
   label: "Category",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
    name: "imageurl",
    label: "ImageURL",
    options: {
     filter: true,
     sort: false,
    }
  },
  {
    name: "text",
    label: "Text",
    options: {
     filter: true,
     sort: false,
    }
   },
  // {
  //   name: "createdAt",
  //   label: "CreatedAt",
  //   options: {
  //    filter: true,
  //    sort: false,
  //   }
  //  },
  //  {
  //   name: "updatedAt",
  //   label: "UpdatedAt",
  //   options: {
  //    filter: true,
  //    sort: false,
  //   }
  //  },
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

function BlogList() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [Bloglist, setBlogList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(config.ALL_BLOGS)
    .then(response => {
        if (response.data.length > 0) {
          setBlogList(response.data);
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
      <PageTitle title="Blogs" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { Bloglist ? <MUIDataTable
            title="Blog List"
            data={Bloglist}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let BlogsArray = [];
                selectedData.data.map ( item => {
                  BlogsArray.push(Bloglist[item.index]['_id']);
                });

                console.log(BlogsArray);

                axios.post(config.DELETE_BLOG, BlogsArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(Bloglist[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>

      {showedit ? <BlogEdit data={selected} /> : ""}
    </>
  );
}

export default BlogList;