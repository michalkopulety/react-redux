/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import AddFine from 'containers/AddFine';


export default class FinesOverview extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.initalLoad(this.props.match.params.id);
    }

    render() {
        const { players, playerList, fines, unpaidFinesByPlayerId } = this.props;

        return (
            <article>
                <Helmet>
                    <title>Přehled pokut</title>
                    <meta name="description" content="A React.js Boilerplate application homepage" />
                </Helmet>
                <Grid>

                </Grid>
            </article>
        );
    }
}

FinesOverview.propTypes = {
    initalLoad: PropTypes.func,
    addFine: PropTypes.func,
    player: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};
