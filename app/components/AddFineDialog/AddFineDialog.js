import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { fineList } from './FineList';
import { Button } from '@material-ui/core';

const dialogStyles = theme => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600]
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    subheader: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const AddFineDialog = (props) => {
    return (
        <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Přidat pokutu</DialogTitle>
            <div>
                <List>
                    {fineList.map((fine, id) => (
                        <ListItem button onClick={() => props.handleListItemClick(fine)} key={id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {`${fine.amount}`}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${fine.description}`} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Typography className={props.classes.subheader} variant='subheading'>Vlastní pokuta</Typography>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >
                        <TextField
                            id="description"
                            label="Název"
                            className={props.classes.textField}
                            margin="normal"
                            value={props.customText}
                            onChange={props.handleChange("customText")}
                        />
                        <TextField
                            id="amount"
                            label="Suma"
                            className={props.classes.textField}
                            margin="normal"
                            value={props.customAmount}
                            onChange={props.handleChange("customAmount")}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                    >
                        <Button className={props.classes.button} variant="contained" color="primary" onClick={() => props.handleListItemClick({ description: props.customText, amount: props.customAmount })}>Přidat</Button>
                        <Button className={props.classes.button} variant="contained" color="primary" onClick={props.handleClose}>Zavřít</Button>
                    </Grid>
                </Grid>

            </div>
        </Dialog>
    );
};

AddFineDialog.propTypes = {
};

export default withStyles(dialogStyles)(AddFineDialog);
