import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField, Grid} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryAdd = (props) => {

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.onCancel}
                aria-describedby="category_description"
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <div>
                        <label color={'red'} style={{color : 'red'}}>{props.error}</label>
                    </div>
                    <div>
                        <TextField
                            variant={'outlined'}
                            value={props.value}
                            onChange={props.onChange}
                            defaultValue={props.defalutValue}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onSave} color="primary">
                        {props.saveTitle}
                    </Button>
                    <Button onClick={props.onCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CategoryAdd;