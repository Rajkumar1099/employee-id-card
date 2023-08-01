import { legacy_createStore,applyMiddleware ,combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import { UserReducer } from "./User/UserReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const enhancer=composeEnhancers(
    applyMiddleware(...middleware)
);
const rootReducer = combineReducers({
    UserReducer
})
export const store= legacy_createStore(rootReducer, enhancer)