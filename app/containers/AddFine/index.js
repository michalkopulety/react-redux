import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { insertFine } from '../App/actions';
import saga from './saga';
import AddFine from './AddFine';

const mapDispatchToProps = (dispatch) => ({
    addFine: (id, fine, hash) => {
        dispatch(insertFine(id, fine, hash));
    }
});

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'addFine', saga });
export default compose(withSaga, withConnect)(AddFine);
