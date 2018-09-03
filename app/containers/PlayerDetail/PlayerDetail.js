/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
// import './style.scss';


export default class PlayerDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // componentWillMount() {
  //   this.props.initalLoad();
  // }

  componentDidMount() {
    this.props.initalLoad(this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1));
  }

  render() {
    const { player } = this.props;

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Grid container spacing={24}>
          {player.firstName}
        </Grid>
      </article>
    );
  }
}

// PlayerDetail.propTypes = {
//   initalLoad: PropTypes.func,
//   playersById: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.bool
//   ])
// };
