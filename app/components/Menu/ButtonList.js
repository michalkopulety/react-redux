import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Cake from '@material-ui/icons/Cake';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import Calendar from '@material-ui/icons/CalendarToday';

class ButtonList extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <List>
                <div>
                    <ListItem button component="a" href="/">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Přehled" />
                    </ListItem>
                    <ListItem button component="a" href="/overview/">
                        <ListItemIcon>
                            <MonetizationOn />
                        </ListItemIcon>
                        <ListItemText primary="Přehled pokut" />
                    </ListItem>
                    <ListItem button component="a" href="/players/">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hráči" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Calendar />
                        </ListItemIcon>
                        <ListItemText primary="Kalendář" />
                    </ListItem>
                    <ListItem button component="a" href="/birthday/">
                        <ListItemIcon>
                            <Cake />
                        </ListItemIcon>
                        <ListItemText primary="Narozeniny" />
                    </ListItem>
                </div>
            </List>
        );
    }
}

export default ButtonList;