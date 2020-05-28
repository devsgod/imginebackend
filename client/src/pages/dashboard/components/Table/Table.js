import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Select,
  MenuItem,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";

import axios from "axios";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  const [action, setAction] = React.useState('');

  const handleChange = (event, item) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setAction(event.target.value);

            if (event.target.value == item._id + 1 )
            {
              item.status = "sent";
            }
            else if (event.target.value == item._id + 2 )
            {
              item.status = "pending";
            }
            else if (event.target.value == item._id + 3 )
            {
              item.status = "declined";
            }
            axios.put(`http://localhost:5000/queue/${item._id}/update`, item);
          }
        },
        {
          label: 'No',
          onClick: () => {return;}
        }
      ]
    });
  };

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
            <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{/* { _id, name, email, product, price, city, status } */}
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="pl-3 fw-normal">{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.product}</TableCell>
            <TableCell>${item.price}</TableCell>
            {/* <TableCell>{date}</TableCell> */}
            <TableCell>{item.city}</TableCell>
            <TableCell>
              <Button
                color={states[item.status.toLowerCase()]}
                size="small"
                className="px-2"
                variant="contained"
              >
                {item.status}
              </Button>
            </TableCell>
            <TableCell>
              <Select
                value={action}
                onChange={(e) => handleChange(e, item)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={item._id + 1}>Send</MenuItem>
                <MenuItem value={item._id + 2}>Pending</MenuItem>
                <MenuItem value={item._id + 3}>Decline</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
