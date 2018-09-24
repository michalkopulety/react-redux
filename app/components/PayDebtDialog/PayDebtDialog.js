import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Slide } from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const PayDebtDialog = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            keepMounted aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="confirmation-dialog-title">
                Zaplatit pokuty
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Opravdu chcete zaplatit {props.numSelected} položky o celkové hodnotě {props.selectedAmount}Kč?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Zrušit</Button>
                <Button onClick={props.onConfirm} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

PayDebtDialog.propTypes = {
};

export default PayDebtDialog;
