import {
	connect
} from 'react-redux';
import {
	compose
} from 'redux';
import {
	createStructuredSelector
} from 'reselect';
import {
	makeSelectLoading,
	makeSelectError,
	makeSelectPlayers,
	makeSelectPlayersList
} from 'containers/App/selectors';
import Birthday from './Birthday';
import { loadPlayers } from 'containers/App/actions';
import saga from '../App/saga';
import injectSaga from 'utils/injectSaga';

const mapDispatchToProps = (dispatch) => ({
	initalLoad: () => {
		dispatch(loadPlayers());
	}
});

const mapStateToProps = createStructuredSelector({
	loading: makeSelectLoading(),
	error: makeSelectError(),
	playersById: makeSelectPlayers(),
	playersList: makeSelectPlayersList()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Birthday);
