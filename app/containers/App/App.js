/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from 'components/Menu';
import Birthday from 'containers/Birthday/Loadable'
import Players from 'containers/PlayerList/Loadable';
import CreatePlayer from 'containers/CreatePlayer/Loadable';
import FinesOverview from 'containers/FinesOverview/Loadable';
import PlayerDetail from 'containers/PlayerDetail/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from 'containers/Auth/Auth';
import Callback from 'containers/Auth/Callback';
import NotSufficientRights from 'components/NotSufficientRights';
import request from 'utils/request';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar
});

const drawerWidth = 240;

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.history);
  }
}

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Menu auth={auth} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path="/" component={Players} />
              <Route exact path="/players" component={Players} />
              <Route exact path="/players/create" render={() => (
                this.props.user.role === "admin" ? (<Route component={CreatePlayer} />)
                  : (<Route component={NotSufficientRights} />)
              )} />
              <Route path="/players/:id" component={PlayerDetail} />
              <Route exact path="/birthday" component={Birthday} />
              <Route exact path="/overview" component={FinesOverview} />
              <Route exact path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
              }} />
              <Route path="" component={NotFoundPage} />
            </Switch>

          </main>

        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
