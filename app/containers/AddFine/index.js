import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/AddFine/saga';
import { insertFine } from '../App/actions';
import { makeSelectLoggedUser } from 'containers/Auth/selectors';

import AddFine from './AddFine';

const mapDispatchToProps = (dispatch) => ({
    addFine: (id, fine) => {
        dispatch(insertFine(id, fine));
    }
});

const mapStateToProps = createStructuredSelector({
    user: makeSelectLoggedUser()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'addFine', saga });
export default compose(withSaga, withConnect)(AddFine);
