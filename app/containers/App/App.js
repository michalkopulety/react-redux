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
import HomePage from 'containers/HomePage/Loadable';
import Players from 'containers/PlayerList/Loadable';
import CreatePlayer from 'containers/CreatePlayer/Loadable';
import FinesOverview from 'containers/FinesOverview/Loadable';
import PlayerDetail from 'containers/PlayerDetail/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Menu />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/players" component={Players} />
              <Route exact path="/players/create" component={CreatePlayer} />
              <Route path="/players/:id" component={PlayerDetail} />
              <Route exact path="/birthday" component={Birthday} />
              <Route exact path="/overview" component={FinesOverview} />
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
