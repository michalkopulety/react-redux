/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import PlayerCard from 'components/PlayerCard';
import { Map, Set } from 'immutable';
import './style.scss';

const playersCard = (playerId, playerMap) => {
  if (playerId && playerMap) {
    return playerId.map((id) => (
      <Grid key={id} item xs={6} sm={3}>
        <PlayerCard player={playerMap.get(id)} key={id} />
      </Grid>)
    );
  }
};

export default class PlayersList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.initalLoad();
  }

  render() {
    const { playersById, playersList } = this.props;


    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Grid container spacing={24}>
          {playersCard(playersList, playersById)}
        </Grid>
      </article>
    );
  }
}

PlayersList.propTypes = {
  initalLoad: PropTypes.func,
  playersById: PropTypes.oneOfType([
    PropTypes.instanceOf(Map),
    PropTypes.bool
  ]),
  playersList: PropTypes.oneOfType([
    PropTypes.instanceOf(Set),
    PropTypes.bool
  ])
};
