import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import TestimonialEdit from "./testimonialEdit";
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
    filter: false,
    sort: true,
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
   name: "position",
   label: "Position",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "content",
   label: "Content",
   options: {
    filter: false,
    sort: false,
   }
  },
  {
    name: "imageurl",
    label: "ImageUrl",
    options: {
     filter: false,
     sort: false,
    }
  },
  {
    name: "category",
    label: "Category",
    options: {
     filter: true,
     sort: true,
    }
  },
  {
    name: "createdAt",
    label: "CreatedAt",
    options: {
     filter: false,
     sort: false,
    }
   },
   {
    name: "updatedAt",
    label: "UpdatedAt",
    options: {
     filter: false,
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

function TestimonialList() {

  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  var [Testimoniallist, setTestimonialList] = useState(null);

  var [showedit, setShowEdit] = useState(false);
  var [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(config.ALL_TESTIMONIALS)
    .then(response => {
        if (response.data.length > 0) {
          setTestimonialList(response.data);
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
      <PageTitle title="Testimonials" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          { Testimoniallist ? <MUIDataTable
            title="Testimonial List"
            data={Testimoniallist}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: ( selectedData ) => {
                let TestimonialsArray = [];
                selectedData.data.map ( item => {
                  TestimonialsArray.push(Testimoniallist[item.index]['_id']);
                });

                console.log(TestimonialsArray);

                axios.post(config.DELETE_TESTIMONIAL, TestimonialsArray)
                .then(res => {
                })
                .catch(function (error) {
                });
              },

              onRowsSelect: (currentRowsSelected, allRowsSelected) => { 
                setShowEdit(true); 
                setSelected(Testimoniallist[currentRowsSelected[0].index]);
              },
            }}
          /> : "No data to display!" }
        </Grid>
      </Grid>

      {showedit ? <TestimonialEdit data={selected} /> : ""}
    </>
  );
}

export default TestimonialList;