import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddFineDialog from 'components/AddFineDialog';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const dialogStyles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class AddFine extends React.Component {
    state = {
        openDialog: false,
        selectedValue: "",
        customText: "",
        customAmount: ""
    };

    handleOpen = value => {
        this.setState({ openDialog: true });
    };

    handleClose = value => {
        this.setState({ openDialog: false });
    };

    handleListItemClick = value => {
        this.props.addFine(this.props.playerId, value);
        this.handleClose();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { openDialog, selectedValue, customText, customAmount, classes } = this.state;

        return (
            <div>
                <Button variant="fab" className={this.props.classes.fab} color='primary' onClick={this.handleOpen}>
                    <AddIcon />
                </Button>
                <AddFineDialog
                    handleListItemClick={this.handleListItemClick}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    selectedValue={selectedValue}
                    customText={customText}
                    customAmount={customAmount}
                    open={openDialog}

                />
            </div >
        );
    }
};

AddFine.propTypes = {
    playerId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

export default withStyles(dialogStyles)(AddFine);
