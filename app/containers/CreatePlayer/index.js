import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadPlayers } from '../App/actions';
import { makeSelectPlayers, makeSelectPlayersList } from '../App/selectors';
import saga from '../App/saga';
import CreatePlayer from './CreatePlayer';

const mapDispatchToProps = (dispatch) => ({
    postPlayer: () => {
    }
});

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreatePlayer);
