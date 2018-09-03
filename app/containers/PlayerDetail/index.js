import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadPlayer } from '../App/actions';
import { makeSelectPlayer } from '../App/selectors';
import saga from './saga';
import PlayerDetail from './PlayerDetail';

const mapDispatchToProps = (dispatch) => ({
  initalLoad: (id) => {
    dispatch(loadPlayer(id));
  }
});

const mapStateToProps = createStructuredSelector({
  player: makeSelectPlayer()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'playerDetail', saga });

export default compose(withSaga, withConnect)(PlayerDetail);
