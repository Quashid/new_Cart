import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {applyMiddleware, createStore,compose, combineReducers} from  'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer } from './reducers/orderReducers';
import { userUpdateProfileReducer } from './actions/userActions';

const initialState = {
    cart:{
       cartItems: localStorage.getItem('cartItems')
        ?
        JSON.parse(localStorage.getItem('cartItems'))
        :[],
        shippingAddress : 
            localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):{},
        paymentMethod:'Paypal',
    },
    userSignin:{
        userInfo: localStorage.getItem('userInfo')
        ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null,
    }
};

console.log("initial state is",initialState)


const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderMineList:orderMineListReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
})

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware((thunk))));

export default store;