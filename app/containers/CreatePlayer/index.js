import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { createPlayer } from '../App/actions';
import CreatePlayer from './CreatePlayer';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
    postPlayer: (player) => {
        dispatch(createPlayer(player));
    }
});

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'createPlayer', saga });
export default compose(withSaga, withConnect)(CreatePlayer);
