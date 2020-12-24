import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/product';
import Rating from '../components/rating';



const ProductScreen = (props) => {
    
    const productDetails = useSelector(state => state.productDetails);
    const {product,error,loading} = productDetails;
    const productId = props.match.params.id;

    const [qty,setQty] = useState(1);

    console.log("Product id is"+productId);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(detailsProduct(productId));
    },[dispatch,productId]);


    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }


    return (<div>
        <div>
            {loading ? (<LoadingBox></LoadingBox>):error?(<MessageBox variant="danger">{error}</MessageBox>):
            (<div>
                <Link to="/">Back</Link>
                <div className="row top">
                <div className="col-2">
                 <img src={product.image} alt={product.name} className="large"></img>
                </div>
                <div className="col-1">
                 <ul>
                     <li>
                         <h1>{product.name}</h1>
                     </li>
                     <li>
                         <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                     </li>
                         <li>Price : ${product.price}</li>
                     <li>
                         Description: <p>{product.description}</p>
                     </li>
                 </ul>
                </div>
                <div className="col-1">
                     <div className="card card-body">
                         <ul>
                             <li>
                                 <div className="row">
                                     <div>Price</div>
                                             <div className="price"> ${product.price}</div>
                                 </div>
                             </li>
                             <li>
                                 <div className="row">
                                     <div>Status</div>
                                             <div>
                                                 {
                                                     product.countInStock >0? (<span className="success">In Stock</span>):
                                                     (<span className="danger">Out Of Stock</span>)
                                                 } </div>
                                 </div>
                             </li>
                             
                                 {product.countInStock >0 && 
                                 (
                                     <>
                                     <li>
                                         <div className="row">
                                         <div >QTY</div>
                                         <div>
                                             <select value={qty} onChange={evt =>{setQty(evt.target.value)}}>
                                             {
                                                 [...Array(product.countInStock).keys()].map(item =>(
                                                 <option key={item+1} value={item+1}>{item+1}</option>
                                                 )
                                                 )
                                             }
                                             </select>
                                         </div>
                                         </div>
                                     </li>
                                    <li>
                                    <button className="primary block" onClick={addToCartHandler}>Add To Card</button>
                                </li>
                                </>
                                 )}
                         </ul>
                     </div>
                 </div>
             </div>
             </div>
            )
            }
        
          </div>
       
</div>);
}


export default ProductScreen;