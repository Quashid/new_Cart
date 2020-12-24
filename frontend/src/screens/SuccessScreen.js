import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';


const SuccessScreen = props => {

    const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
    if(!userInfo)
    {
        props.history.push("/signin");
    }

    if(true)
    {
        setTimeout(
            ()=>{
                props.history.push("/");
            },1500
        )
    }

    return( <div>
        <LoadingBox></LoadingBox>
        <h2>Order Placed SuccessFully...</h2>
    </div>);
};



 export default SuccessScreen;