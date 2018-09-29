/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, TextField, Typography, Divider, MenuItem, List, ListItem, ListItemText, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const previousWeek = new Date();
const previousMonth = new Date();
const previousYear = new Date();

previousWeek.setDate(previousWeek.getDate() - 7);
previousMonth.setMonth(previousMonth.getMonth() - 1);
previousYear.setFullYear(previousYear.getFullYear() - 1);

const periods = {
    1: {
        value: 1,
        label: "poslední týden",
        date: previousWeek
    },
    2: {
        value: 2,
        label: "poslední měsíc",
        date: previousMonth
    },
    3: {
        value: 3,
        label: "poslední rok",
        date: previousYear
    },
    4: {
        value: 4,
        label: "vlastní období",
        date: previousMonth
    }
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const isInRange = (date, from, to) => {
    return date >= from && date <= to;
};

const _calculateAge = (birthdayString) => {
    const birthdayDate = new Date(birthdayString);
    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const getPlayers = (playersList, playerMap, comparisonDate) => {
    const a = playersList.toArray();
    const hraci = a.map((playerId) => playerMap.get(playerId));
    const to = new Date();
    const oslavenci = hraci.filter((hrac) => {
        if (!hrac.birthday) { return false }
        const birthDayDate = new Date(hrac.birthday);
        const birthDay = new Date(new Date().getFullYear(), birthDayDate.getMonth(), birthDayDate.getDate());
        const birthDayPreviousYear = new Date(new Date().getFullYear() - 1, birthDayDate.getMonth(), birthDayDate.getDate());
        return isInRange(birthDay, comparisonDate, to) || isInRange(birthDayPreviousYear, comparisonDate, to);
    });

    return oslavenci;
}

const createList = (players) => {
    return (
        <Paper>
            <Table>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.hashId}>
                            <TableCell>
                                <img src={`https://res.cloudinary.com/dtx9htwec/image/upload/w_60,h_60,c_thumb,g_face,r_max/${player.imageUrl}`} />
                            </TableCell>
                            <TableCell>
                                {`${player.firstName} ${player.lastname}`}
                            </TableCell>
                            <TableCell>
                                {`${new Date(player.birthday).toLocaleDateString()}`}
                            </TableCell>
                            <TableCell>
                                {_calculateAge(player.birthday)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>

    );
}

class Birthday extends React.Component { // eslint-disable-line react/prefer-stateless-function
    state = {
        currency: 1,
        date: previousWeek
    };

    componentWillMount() {
        this.props.initalLoad();
    }

    handleChange = (event) => {
        this.setState({ currency: event.target.value, date: periods[event.target.value].date });
    }

    handleCustomDateChange = (event) => {
        this.setState({ date: new Date(event.target.value) });
    }

    render() {
        const { playersById, playersList, classes } = this.props;
        const { date } = this.state;


        return (
            <article>
                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="A React.js Boilerplate application homepage" />
                </Helmet>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={24}
                >
                    <Grid item xs={12}>
                        <Typography variant="headline">
                            Narozeniny
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        Lidé, kteří měli narozeniny za:
                    <TextField
                            id="select-currency"
                            select
                            label="Vyber"
                            className={classes.textField}
                            value={this.state.currency}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                        >
                            {Object.keys(periods).map((key) => (
                                <MenuItem key={periods[key].value} value={periods[key].value}>
                                    {periods[key].label}
                                </MenuItem>
                            ))
                            }
                        </TextField>
                        {this.state.currency === 4 && (
                            <TextField
                                id="date"
                                label="Narozeniny"
                                type="date"
                                onChange={this.handleCustomDateChange}
                                defaultValue={date.toISOString().split('T')[0]}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}

                    </Grid>
                    <Grid item xs={12}>
                        {playersList && createList(getPlayers(playersList, playersById, date))}
                    </Grid>


                </Grid>
            </article>
        );
    }
}

Birthday.propTypes = {
};

export default withStyles(styles)(Birthday);