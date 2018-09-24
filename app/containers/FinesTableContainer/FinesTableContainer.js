import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FinesTable from 'components/FinesTable';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class FinesTableContainer extends React.Component {
    render() {
        const { paidFines, unpaidFines, selectedContainer, changeSelectedTab, unpaidFinesSettings, paidFinesSettings, classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={selectedContainer} onChange={changeSelectedTab}>
                        <Tab label="Nezaplacené" />
                        <Tab label="Zaplacené" />
                    </Tabs>
                </AppBar>
                {selectedContainer === 0 && <TabContainer><FinesTable fines={unpaidFines} enablePaymentButton={selectedContainer === 0} settings={unpaidFinesSettings} updateFineTableSettings={this.props.updateFineTableSettings("unpaid")} /></TabContainer>}
                {selectedContainer === 1 && <TabContainer><FinesTable fines={paidFines} enablePaymentButton={selectedContainer === 0} settings={paidFinesSettings} updateFineTableSettings={this.props.updateFineTableSettings("paid")} /></TabContainer>}
            </div>
        );
    }
}

FinesTableContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinesTableContainer);