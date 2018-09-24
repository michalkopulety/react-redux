// export { default } from './App';
import saga from '../App/saga';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import App from './App';
import { compose } from 'redux';

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
