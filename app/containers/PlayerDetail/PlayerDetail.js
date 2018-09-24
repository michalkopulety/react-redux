/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import PlayerInfo from 'components/PlayerInfo';
import FinesTableContainer from 'containers/FinesTableContainer';
import AddFine from 'containers/AddFine';


export default class PlayerDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.initalLoad(this.props.match.params.id);
  }

  handleButtonClick = (event) => {
    this.props.addFine(this.props.player.id, {
      description: "Mobil",
      amount: 20
    });
  }

  handleClose = value => {
    this.setState({ open: false });
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { player } = this.props;
    const isDataLoaded = Object.keys(player).length !== 0;
    const article = (
      <Grid spacing={24}>
        <PlayerInfo player={player} />
        <FinesTableContainer playerId={player.id} />
        <AddFine playerId={player._id} hashId={player.hashId} />
      </Grid>
    );

    return (
      <article>
        <Helmet>
          <title>{`${player.firstName} ${player.lastname} - informace`}</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        {isDataLoaded && article}
      </article>
    );
  }
}

PlayerDetail.propTypes = {
  initalLoad: PropTypes.func,
  addFine: PropTypes.func,
  player: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};
