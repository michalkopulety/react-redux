// src/Auth/Auth.js
import React from 'react';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        margin: 10
    }
});

class Login extends React.Component {
    componentDidMount() {
        const storedUser = localStorage.getItem("loggedUser");
        let parsedUser;
        if (storedUser) {
            try {
                parsedUser = JSON.parse(storedUser);
            } catch (err) {
                this.props.changeUser({});
            }

            if (parsedUser.name !== this.props.user.name) {
                this.props.changeUser(parsedUser);
            }
        }
    }

    render() {
        const { classes } = this.props;
        const { isAuthenticated, login, logout, setDispatcher } = this.props.auth
        setDispatcher.call(this.props.auth, this.props.changeUser);
        const loginButton = (
            <Button variant="outlined" color="inherit" onClick={login.bind(this)}>
                Přihlásit
            </Button>
        );
        const logoutButton = (
            <Grid container spacing={16} direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Grid container spacing={16} direction="column" justify="flex-start" alignItems="flex-start">
                        <Typography color="inherit">
                            Přihlášen:
                    </Typography>
                        <Typography color="inherit">
                            {this.props.user.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid>
                    < Avatar
                        className={classNames(classes.avatar)}
                        src={this.props.user.picture || ""}
                    />
                </Grid>
                <Grid>
                    <Button variant="outlined" color="inherit" onClick={logout.bind(this)}>
                        Odhlásit
                </Button>
                </Grid>
            </Grid>
        );
        return (
            <div>
                {isAuthenticated() ? logoutButton : loginButton}
            </div>
        );
    }
}

export default withStyles(styles)(Login);