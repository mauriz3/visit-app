import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import reducers
import { signupReducer } from './components/signup/SignupReducer';
import { loginReducer } from './components/login/LoginReducer';
import { visitsReducer } from "./components/visits/VisitsReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    visits: visitsReducer
  });

export default createRootReducer;
