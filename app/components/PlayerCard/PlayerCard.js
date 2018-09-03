import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function PlayerCard(props) {
  const { player } = props;
  return (
    <div>
      <Card className="b">
        <CardMedia
          className="a"
          image="images/players/dominik_horky.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {` #${ player.jersey} ${player.firstName} ${ player.lastname}` }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={`/players/${player.id}`}>
            Detail
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(PlayerCard);
