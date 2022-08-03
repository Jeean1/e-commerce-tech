import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import Card from 'react-bootstrap/Card';


const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1 className='mg-10'>My Purchases</h1>
            <div>
                {
                    purchases.map(purchase => (

                        <Card key={purchase.id} className="mg-10 card">
                            <Card.Header>{Date(purchase.createdAt).slice(3, 16)}</Card.Header>
                            {
                                purchase.cart.products.map(product => (
                                    <div key={product.id} className="mg-10">
                                        <div>
                                            <ul className='d-flex'>
                                                <li>{product.title}</li>
                                                <li>{product.productsInCart.quantity}</li>
                                                <li>$ {product.price}</li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </Card>
                    ))
                }
<<<<<<< HEAD


=======
>>>>>>> 4b3e3faa35f918dad79b204bc8a36873b3ee1a6f
            </div >
        </div >
    );
};

export default Purchases;