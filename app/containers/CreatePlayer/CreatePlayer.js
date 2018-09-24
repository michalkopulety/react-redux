import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Typography, Divider, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
});

const convertDateToString = (date) => {
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    return `${date.getFullYear()}-${month}-${date.getDate()}`
}

const convertStringDateToDate = (string) => {
    const parts = string.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
};

class PlayersList extends React.PureComponent {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        facrId: '',
        street: '',
        city: '',
        postalCode: '',
        jerseyNumber: '',
        facrLink: '',
        birthday: convertDateToString(new Date())
    };

    handleChange = property => event => {
        this.setState({ [property]: event.target.value });
    }

    postPlayer = () => {
        let player = {
            firstName: this.state.firstName,
            lastname: this.state.lastname,
            birthday: convertStringDateToDate(this.state.birthday),
            facrId: this.state.facrId,
            phone: this.state.phone,
            email: this.state.email,
            address: {
                street: this.state.street,
                city: this.state.city,
                postalCode: this.state.postalCode
            },
            jerseyNumber: this.state.jerseyNumber,
            facrLink: this.state.facrLink
        };
        this.props.postPlayer(player);
    }

    render() {
        const { classes } = this.props;

        return (
            <article>
                <Helmet>
                    <title>Vytvoření nového hráče</title>
                    <meta name="description" content="A React.js Boilerplate application homepage" />
                </Helmet>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    spacing={8}
                >
                    <Grid item xs={12}>
                        <Typography variant="headline">
                            Vytvoření nového hráče
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="firstName"
                                        className={classes.textField}
                                        label="Jméno"
                                        value={this.state.firstName}
                                        onChange={this.handleChange('firstName')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="lastName"
                                        className={classes.textField}
                                        label="Příjmení"
                                        value={this.state.lastname}
                                        onChange={this.handleChange('lastname')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="birthday"
                                        label="Datum narození"
                                        type="date"
                                        value={this.state.birthday}
                                        onChange={this.handleChange('birthday')}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="jerseyNumber"
                                        className={classes.textField}
                                        label="Číslo dresu"
                                        value={this.state.jerseyNumber}
                                        onChange={this.handleChange('jerseyNumber')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="phone"
                                        className={classes.textField}
                                        label="Mobil"
                                        value={this.state.phone}
                                        onChange={this.handleChange('phone')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="mail"
                                        className={classes.textField}
                                        label="E-mail"
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="street"
                                        className={classes.textField}
                                        label="Ulice"
                                        value={this.state.street}
                                        onChange={this.handleChange('street')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="city"
                                        className={classes.textField}
                                        label="Město"
                                        value={this.state.city}
                                        onChange={this.handleChange('city')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="postalCode"
                                        className={classes.textField}
                                        label="PSČ"
                                        value={this.state.postalCode}
                                        onChange={this.handleChange('postalCode')}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="facrId"
                                        className={classes.textField}
                                        label="FAČR ID hráče"
                                        value={this.state.facrId}
                                        onChange={this.handleChange('facrId')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="facrLink"
                                        className={classes.textField}
                                        label="Link hráče FAČR"
                                        value={this.state.facrLink}
                                        onChange={this.handleChange('facrLink')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>




                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.postPlayer}>
                            Vytvořit
                        </Button>
                    </Grid>
                </Grid>
            </article>
        );
    }
}

export default withStyles(styles)(PlayersList);