import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadPlayers, loadFines } from '../App/actions';
import { makeSelectPlayers, makeSelectFinesById, makeSelectPlayersList, makeSelectUnpaidFinesByPlayerId } from '../App/selectors';
import saga from './saga';
import FinesOverview from './FinesOverview';

const mapDispatchToProps = (dispatch) => ({
    initalLoad: (id) => {
        dispatch(loadPlayers(id));
        dispatch(loadFines(id));
    }
});

const mapStateToProps = createStructuredSelector({
    playersById: makeSelectPlayers(),
    playerList: makeSelectPlayersList(),
    fines: makeSelectFinesById(),
    unpaidFinesByPlayerId: makeSelectUnpaidFinesByPlayerId()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withSaga = injectSaga({ key: 'FinesOverview', saga });
export default compose(withConnect)(FinesOverview);
