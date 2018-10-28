import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoggedUser } from './selectors';
import { changeLoggedUser } from './actions';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import Login from './Login';
import reducer from './reducer';

const mapDispatchToProps = (dispatch) => ({
    changeUser: (user) => {
        dispatch(changeLoggedUser(user));
    }
});

const mapStateToProps = createStructuredSelector({
    user: makeSelectLoggedUser()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
    key: 'loginContainer',
    reducer
});

export default compose(withReducer, withConnect)(Login);
