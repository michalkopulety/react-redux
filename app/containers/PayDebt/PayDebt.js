import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AttachMoney from '@material-ui/icons/AttachMoney';
import PayDebtDialog from '../../components/PayDebtDialog/PayDebtDialog';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});



class PayDebt extends React.Component {
    state = {
        payDebtDialog: false
    };

    handleOpen = () => {
        this.setState({ payDebtDialog: true });
    }

    handleClose = () => {
        this.setState({ payDebtDialog: false });
    }

    payDebt = () => {
        this.props.payDebt(this.props.selectedItems);
        this.setState({ payDebtDialog: false });
    }

    render() {
        // const { fines, enablePaymentButton, classes } = this.props;
        const { payDebtDialog, selectedItems } = this.state;

        return (
            <div>
                <Tooltip title="Zaplatit pokutu">
                    <IconButton aria-label="Zaplatit" onClick={this.handleOpen}>
                        <AttachMoney />
                    </IconButton>
                </Tooltip>
                <PayDebtDialog
                    open={payDebtDialog}
                    onClose={this.handleClose}
                    onConfirm={this.payDebt}
                    numSelected={this.props.selectedItems.length}
                    selectedAmount={this.props.selectedAmount} />
            </div>
        );
    }
}

PayDebt.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PayDebt);