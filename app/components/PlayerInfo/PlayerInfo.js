import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

const styles = theme => ({
  card: {
    maxWidth: 345,
    padding: 2
  },
  media: {
    height: 140,
  },
  playerInfo: {
    "margin-top": 15
  },
  button: {
    margin: theme.spacing.unit,
  }
});

function PlayerInfo(props) {
  const { player, classes } = props;
  return (
    <div>

      <Typography variant="headline">
        Detail hráče
      </Typography>

      <Divider />
      <Grid
        classes={classes.playerInfo}
        container
        spacing={16}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid
          item xs={2}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              image={player.imageUrl ? `/${player.imageUrl}` : `/unknown.jpg`}

              title={`${player.firstName} ${player.lastname}`}
            />
          </Card>
        </Grid>

        <Grid
          item
          xs={4}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="subheading" gutterBottom>
            Jméno: {player.firstName}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Příjmení: {player.lastname}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Datum narození: {new Date(player.birthday).toLocaleDateString()}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Telefoní číslo: {player.phone}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Email: {player.email}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Číslo dresu: {player.jerseyNumber}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            FAČR ID: {player.facrId}
          </Typography>
        </Grid>
        {player.facrLink && (<Grid
          item
          xs={4}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >

          <Button href={`https://is.fotbal.cz/hraci/zapasy-hrace.aspx?req=${player.facrLink}`} variant="outlined" color="primary" className={classes.button}>
            Zápasy
          </Button>
          <Button href={`https://is.fotbal.cz/hraci/informace-o-hraci.aspx?req=${player.facrLink}`} variant="outlined" color="primary" className={classes.button}>
            Karta hráče
          </Button>
        </Grid>)}
      </Grid>

    </div>
  );
}


export default withStyles(styles)(PlayerInfo);
