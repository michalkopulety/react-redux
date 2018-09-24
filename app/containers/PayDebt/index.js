import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { payDebt } from '../App/actions';
import { makeSelectPlayer, makeSelectPaidFines, makeSelectUnpaidFines } from '../App/selectors';
import saga from './saga';
import PayDebt from './PayDebt';

const mapDispatchToProps = (dispatch) => ({
    payDebt: (fineIds) => {
        dispatch(payDebt(fineIds));
    }
});

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'payDebt', saga });
export default compose(withSaga, withConnect)(PayDebt);
