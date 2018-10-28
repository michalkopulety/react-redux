import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

const styles = theme => ({
});

function PlayerInfo(props) {
    const { } = props;
    return (
        <div>

            <Typography variant="headline">
                Nemáte dostatečné oprávnění pro tuto operaci
      </Typography>

            <Divider />
            <Grid
                container
                spacing={16}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
            </Grid>
        </div>
    );
}


export default withStyles(styles)(PlayerInfo);