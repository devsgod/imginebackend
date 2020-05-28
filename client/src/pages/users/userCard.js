import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {
  Grid,
  TextField,
} from "@material-ui/core";
// import Typography from '@material-ui/core/Typography';

import backImg from '../../images/txt3.svg';

import axios from "axios";
import config from "../../config/config.json";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 20
  },
});

// for static variable
class Flag {
  constructor() {
      this.id = -1;
  }
  static set(id) {
      this.id = id;
  }
  static get() {
      return this.id;
  }
}

export default function ImgMediaCard(props) {
  const classes = useStyles();

  var [name, setName] = useState("");
  var [username, setUsername] = useState("");
  var [email, setEmail] = useState("");
  var [mobile, setMobile] = useState("");
  var [accountname, setAccountname] = useState("");

  useEffect(() => {
    if (Flag.get() != props.data._id) // only once when props updated
    {
      setName(props.data.name);
      setUsername(props.data.username);
      setEmail(props.data.email);
      setMobile(props.data.mobile);
      setAccountname(props.data.accountname);
      Flag.set(props.data._id);
    }
  });

  console.log(props.data);

  const addWidget = () => {
    setTimeout(() => {
        const User = {
          username: username,
          email: email,
          name: name,
          mobile: mobile,
          accountname: accountname
        }
        
        axios.post(config.EDIT_USER, User)
        .then(res => {
        })
        .catch(function (error) {
        });
    }, 1000);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea style={{position: "relative"}}>
        <CardMedia
          component="img"
          alt="Background Green"
          height="140"
          image={backImg}
          title="Background Green"
        />
        <img src={require('../../images/avatar.png')} alt="user" width="200px" 
          style={{
          position: "absolute",
          top: "10px",
          left: "20%",
          borderRadius: "40px",
          height: "120px",
          width: "60%"}}
        />
        <CardContent>
          <Grid item lg={8} md={8} sm={6} xs={12}>
              <TextField
              id="username"
              InputProps={{
                  classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                  },
              }}
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="normal"
              placeholder="Username"
              type="text"
              fullWidth
              />

              <TextField
              id="name"
              InputProps={{
                  classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                  },
              }}
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="Full Name"
              type="text"
              fullWidth
              />

              <TextField
              id="email"
              InputProps={{
                  classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                  },
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              placeholder="Email"
              type="text"
              fullWidth
              />

            <TextField
              id="mobile"
              InputProps={{
                  classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                  },
              }}
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              margin="normal"
              placeholder="Mobile"
              type="text"
              fullWidth
              />

            <TextField
              id="accountname"
              InputProps={{
                  classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                  },
              }}
              value={accountname}
              onChange={e => setAccountname(e.target.value)}
              margin="normal"
              placeholder="Account Name"
              type="text"
              fullWidth
              />
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {/* Delete */}
        </Button>
        <Button size="small" color="primary" onClick={() => addWidget()}>
          Submit Edition
        </Button>
      </CardActions>
    </Card>
  );
}