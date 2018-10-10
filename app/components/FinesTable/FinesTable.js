import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FinesTableToolbar from 'components/FinesTableToolbar/FinesTableToolbar';
import FinesTableHeader from 'components/FinesTableHeader/FinesTableHeader';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function sumTotal(selectedItems, fines) {
    let a = fines.filter(fine => selectedItems.indexOf(fine.id) !== -1)
    a = a.reduce(
        function (acc, selectedFine) {
            return acc + selectedFine.amount;
        }, 0);
    return a;
}



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



class FinesTable extends React.Component {
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.props.settings.orderBy === property && this.props.settings.order === 'desc') {
            order = 'asc';
        }

        this.updateSettings("order", order);
        this.updateSettings("orderBy", orderBy);
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = this.props.fines.map(n => n.id);
            this.updateSettings("selected", newSelected);
            this.updateSettings("selectedAmount", sumTotal(newSelected, this.props.fines));
            return;
        }

        this.updateSettings("selected", []);
        this.updateSettings("selectedAmount", 0);
    };

    handleClick = (event, id) => {
        const selected = this.props.settings.selected;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.updateSettings("selected", newSelected);
        this.updateSettings("selectedAmount", sumTotal(newSelected, this.props.fines));
    };

    removeSelection = () => {
        this.updateSettings("selected", []);
        this.updateSettings("selectedAmount", 0);
    };

    handleChangePage = (event, page) => {
        this.updateSettings("page", page);
    };

    handleChangeRowsPerPage = event => {
        this.updateSettings("rowsPerPage", event.target.value);
    };

    updateSettings = (name, newValue) => {
        this.props.updateFineTableSettings(name, newValue);
    }

    isSelected = id => this.props.settings.selected.indexOf(id) !== -1;

    render() {
        const { fines, enablePaymentButton, settings, classes } = this.props;

        const emptyRows = settings.rowsPerPage - Math.min(settings.rowsPerPage, fines.length - settings.page * settings.rowsPerPage);

        return !fines ? (<Paper className={classes.root}></Paper>) : (
            <div>
                < Paper className={classes.root} >
                    <FinesTableToolbar enablePaymentButton={enablePaymentButton} selectedAmount={settings.selectedAmount} fines={fines} selectedItems={settings.selected} removeSelection={this.removeSelection} />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <FinesTableHeader
                                numSelected={settings.selected.length}
                                order={settings.order}
                                orderBy={settings.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={fines.length}
                            />
                            <TableBody>
                                {stableSort(fines, getSorting(settings.order, settings.orderBy))
                                    .slice(settings.page * settings.rowsPerPage, settings.page * settings.rowsPerPage + settings.rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.description}
                                                </TableCell>
                                                <TableCell numeric>{n.amount}</TableCell>
                                                <TableCell>{new Date(n.createdAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={fines.length}
                        rowsPerPage={settings.rowsPerPage}
                        page={settings.page}
                        backIconButtonProps={{
                            'aria-label': 'Předchozí strana',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Následující strana',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />

                </Paper >
            </div>
        );
    }
}

FinesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinesTable);