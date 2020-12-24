// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {Link} from 'react-router-dom';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import {signin} from '../actions/userActions';

// export default function ProductsScreen(props)
// {
//     const[name,setName] = useState("");
//     const[price,setPrice] = useState('');

//     // const redirect = props.location.search?props.location.search.split('=')[1]:
//     // '/';

//     const productSave=useSelector(state => state.productSave);
//     const {loading:loadingSave,success:successSave,error:errorSave} = productSave;

//     const dispatch = useDispatch();

//     const submitHandler = (e) =>{
//         e.preventDefault();
//         dispatch(saveProduct({name,price});
//     }


//     useEffect(
//       ()=>{
//        if(userInfo)
//        {
//          props.history.push(redirect);
//        }
//       },[props.history,redirect,userInfo]
//     )

//     return (
//         <div>
//         <form className="form" onSubmit={submitHandler}>
//           <div>
//             <h1>Sign In</h1>
//           </div>
//           {loading && <LoadingBox></LoadingBox>}
//           {error && <MessageBox variant="danger">{error}</MessageBox>}
//           <div>
//             <label htmlFor="email">Email address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter password"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             ></input>
//           </div>
//           <div>
//             <label />
//             <button className="primary" type="submit">
//               Sign In
//             </button>
//           </div>
//           <div>
//             <label />
//             <div>
//               New customer?{' '}
//               <Link to={`/register?redirect=${redirect}`}>
//                 Create your account
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     )
// }