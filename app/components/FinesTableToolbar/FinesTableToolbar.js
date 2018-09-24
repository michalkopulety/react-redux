import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PayDebt from 'containers/PayDebt';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let FinesTableToolbar = props => {
    const { enablePaymentButton, selectedAmount, classes, fines, selectedItems, removeSelection } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: selectedItems.length > 0,
            })}
        >
            <div className={classes.title}>
                {selectedItems.length > 0 &&
                    <Typography color="inherit" variant="subheading">
                        {selectedItems.length} vybrané položky | Celkem {selectedAmount} Kč
                    </Typography>
                }
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {(selectedItems.length > 0 && enablePaymentButton) && (
                    <PayDebt selectedAmount={selectedAmount} fines={fines} selectedItems={selectedItems} removeSelection={removeSelection} />
                )
                }
            </div>
        </Toolbar>
    );
};

FinesTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(FinesTableToolbar);