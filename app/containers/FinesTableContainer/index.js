import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { loadPlayerFines } from 'containers/App/actions';
import { changeSelectedTab, changeSettings } from './actions';
import { makeSelectPaidFines, makeSelectUnpaidFines } from 'containers/App/selectors';
import { makeSelectSelectedTab, makeSelectPaidSettings, makeSelectUnpaidSettings } from './selectors';


import reducer from './reducer';
import FinesTableContainer from './FinesTableContainer';

const mapDispatchToProps = (dispatch) => ({
    changeSelectedTab: (event, selectedTab) => {
        dispatch(changeSelectedTab(selectedTab));
    },
    updateFineTableSettings: (finesTableType) => (property, newValue) => {
        dispatch(changeSettings(finesTableType, property, newValue));
    }
});

const mapStateToProps = createStructuredSelector({
    paidFines: makeSelectPaidFines(),
    unpaidFines: makeSelectUnpaidFines(),
    selectedContainer: makeSelectSelectedTab(),
    paidFinesSettings: makeSelectPaidSettings(),
    unpaidFinesSettings: makeSelectUnpaidSettings()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
    key: 'finesContainer',
    reducer
});

export default compose(withReducer, withConnect)(FinesTableContainer);