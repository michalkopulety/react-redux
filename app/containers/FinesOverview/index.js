import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadPlayers } from '../App/actions';
import { makeSelectPlayers, makeSelectPlayersList } from '../App/selectors';
import saga from './saga';
import FinesOverview from './FinesOverview';

const mapDispatchToProps = (dispatch) => ({
    initalLoad: () => {
        dispatch(loadPlayers());
    }
});

const mapStateToProps = createStructuredSelector({
    playersById: makeSelectPlayers(),
    playerList: makeSelectPlayersList()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withSaga = injectSaga({ key: 'FinesOverview', saga });
export default compose(withConnect)(FinesOverview);
