
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {BrowserRouter, Route,Link} from 'react-router-dom'
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import SuccessScreen from './screens/SuccessScreen';
function App() {

  const cart=useSelector(state => state.cart);
  const {cartItems} = cart;

  const userSignin=useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  
  const dispatch = useDispatch();

  const signoutHandler = () =>{
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
        <Link className="brand" to="/">fashion-store</Link>
      </div>
      <div>
        <Link to="/cart">Cart
        {
          cartItems.length > 0 && (
          <span className="badge">{cartItems.length}</span>
          )
        }
        </Link>
        {
          userInfo? 
          (
            <div className="dropdown">
          <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
          <ul className="dropdown-content">
          <li>
              <Link to="/profile">User Profile</Link>
            </li>
            <li>
              <Link to="/orderhistory">Order History</Link>
            </li>
            <li>
            <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
            </li>
          </ul>
          </div>
          )
           :
           (<Link to="/signin">Sign In</Link>)
        }
         {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>
    </header>
    <main>
    <Route path="/cart/:id?" component={CartScreen} exact></Route>
    <Route path="/product/:id" component={ProductScreen} exact></Route>
    <Route path="/signin" component={SigninScreen} exact></Route>
    <Route path="/register" component={RegisterScreen} exact></Route>
    <Route path="/shipping" component={ShippingAddressScreen} exact></Route>
    <Route path="/payment" component={PaymentMethodScreen} exact></Route>
    <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
    <Route path="/order/:id" component={OrderScreen} exact></Route>
    <Route path="/details/:id" component={OrderDetailsScreen} exact></Route>
    <Route path="/success" component={SuccessScreen} exact></Route>
    <Route path="/orderhistory" component={OrderHistoryScreen} exact></Route>
    <PrivateRoute path="/profile" component={ProfileScreen} exact></PrivateRoute>
    {/* <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
    <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
    <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
    <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
    <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute> */}
      <Route path="/" component={HomeScreen} exact></Route>
      
    </main>
    <footer className="row center">@All rights reserved</footer>
  </div>
  </BrowserRouter>
  );
}

export default App;