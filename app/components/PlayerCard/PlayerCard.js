import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from 'utils/images';

const styles = {
  card: {
    maxWidth: 200,
  },
};

function PlayerCard(props) {
  const { player, classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={player.imageUrl ? image(player.imageUrl) : image("players/unknown.png")}
          title={`${player.firstName} ${player.lastname}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline">
            {`${player.lastname}`}
          </Typography>
          <Typography gutterBottom variant="subheading">
            {`${player.firstName}  #${player.jerseyNumber}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={`/players/${player.hashId}`}>
            Detail
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(PlayerCard);
