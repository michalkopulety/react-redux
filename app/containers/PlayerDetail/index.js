import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadPlayer, loadPlayerFines } from '../App/actions';
import { makeSelectPlayer, makeSelectPaidFines, makeSelectUnpaidFines } from '../App/selectors';
import saga from './saga';
import PlayerDetail from './PlayerDetail';

const mapDispatchToProps = (dispatch) => ({
  initalLoad: () => {
    dispatch(loadPlayer());
    // dispatch(loadPlayerFines(id));
  }
});

const mapStateToProps = createStructuredSelector({
  player: makeSelectPlayer(),
  paidFines: makeSelectPaidFines(),
  unpaidFines: makeSelectUnpaidFines()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'playerDetail', saga });
export default compose(withSaga, withConnect)(PlayerDetail);
