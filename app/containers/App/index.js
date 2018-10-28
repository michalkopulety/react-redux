// export { default } from './App';
import saga from '../App/saga';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { makeSelectLoggedUser } from 'containers/Auth/selectors'
import App from './App';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = createStructuredSelector({
    user: makeSelectLoggedUser()
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga, withConnect)(App);
