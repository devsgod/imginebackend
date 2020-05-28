import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useStyles from "../../components/Layout/styles";
import axios from "axios";
import config from "../../config/config.json";

import {
    Grid,
    } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BuyerInfo = (props) => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [townCity, setTownCity] = useState("");
    const [stateCounty, setStateCounty] = useState("");
    const [postCode, setPostCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (props.buyerInfo){
            console.log(props.buyerInfo);

            setFirstName(props.buyerInfo.firstName);
            setAddress(props.buyerInfo.address);
            setCompany(props.buyerInfo.company);
            setCountry(props.buyerInfo.country);
            setTownCity(props.buyerInfo.townCity);
            setPostCode(props.buyerInfo.postCode);
            setStateCounty(props.buyerInfo.stateCounty);
            setEmail(props.buyerInfo.email);
        }
    }, [props.buyerInfo]);

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'lg'}
                disableEscapeKeyDown={true}
                disableEnforceFocus={true}
                onClose={props.onClose}
                aria-describedby="category_description"
            >
                <DialogTitle
                    style={{textAlign : 'center', color : 'red', fontSize : '30px', paddingBottom : '20px'}}
                >
                    Buyer Information
                </DialogTitle>
                <div>
                    <label color={'red'} style={{color : 'red'}}>{error}</label>
                </div>
                <DialogContent>
                    <Grid container spacing={1} style={{textAlign : 'center'}} alignItems={"center"} justify={'space-between'}>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Name : {firstName + ' ' + lastName}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Email : {email}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Phone Number : {phone}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Company : {company}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Country : {country}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Address : {address}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            Town/City : {townCity}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            State/County : {stateCounty}
                        </Grid>
                        <Grid item  xs={12} lg={6} md={6} xl={6}>
                            PostCode/Zip : {postCode}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{alignItems : 'center', justifyContent : 'center'}}>
                    <Button
                        variant="contained"
                        color="default"
                        style={{width : '150px'}}
                        onClick={props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BuyerInfo;