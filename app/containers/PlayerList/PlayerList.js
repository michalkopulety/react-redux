/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import PlayerCard from 'components/PlayerCard';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import CardIcon from '@material-ui/icons/ViewModule';
import AddIcon from '@material-ui/icons/LibraryAdd';
import Divider from '@material-ui/core/Divider';
import { Map, Set } from 'immutable';

const playersCard = (playerId, playerMap) => {
  if (playerId && playerMap) {
    return playerId.map((id) => (
      <Grid key={id} item xs={6} sm={4} md={3} lg={2}>
        <PlayerCard player={playerMap.get(id)} key={id} />
      </Grid>)
    );
  }
};

const playersTable = (playerId, playerMap) => {
  if (playerId && playerMap) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fotka</TableCell>
            <TableCell>Jméno</TableCell>
            <TableCell>Příjmení</TableCell>
            <TableCell numeric>Č. dresu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            playerId.map((id) => {
              const player = playerMap.get(id);
              return (
                <TableRow key={id} button component="a" href={`/players/${id}`}>
                  <TableCell>
                    <img src={`https://res.cloudinary.com/dtx9htwec/image/upload/w_60,h_60,c_thumb,g_face,r_max/${player.imageUrl}`} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {player.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {player.lastname}
                  </TableCell>
                  <TableCell numeric component="th" scope="row">
                    {player.jerseyNumber}
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  }
};

export default class PlayersList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    list: false
  };

  componentWillMount() {
    this.props.initalLoad();
  }

  handleShowCardView = () => {
    this.setState({ list: false });
  };

  handleShowListView = () => {
    this.setState({ list: true });
  };

  handleNavigateToDetail = () => {
    debugger;
  };

  render() {
    const { playersById, playersList } = this.props;


    return (
      <article>
        <Helmet>
          <title>{`Seznam hračů`}</title>
          <meta name="description" content="Seznam hráčů" />
        </Helmet>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Typography variant="headline">
            Seznam hráčů
          </Typography>
          <div>
            <IconButton aria-label="Add player" component="a" href="/players/create">
              <AddIcon />
            </IconButton>
            <IconButton aria-label="Grid view" disabled={!this.state.list} onClick={this.handleShowCardView}>
              <CardIcon />
            </IconButton>
            <IconButton aria-label="List view" disabled={this.state.list} onClick={this.handleShowListView}>
              <ListIcon />
            </IconButton>
          </div>
        </Grid>
        <Divider />
        <Grid container spacing={8}>
          {this.state.list ? playersTable(playersList, playersById) : playersCard(playersList, playersById)}
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
