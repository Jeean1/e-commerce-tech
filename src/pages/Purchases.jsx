import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchases)



    return (
        <div>
            <h1>Purchases</h1>

            <div>
                {
                    purchases.map(purchase => (

                        <Card key={purchase.id}>
                            <Card.Header>{Date(purchase.createdAt).slice(3, 16)}</Card.Header>
                            {
                                purchase.cart.products.map(product => (

                                    <div key={product.id} className="mg-10">

                                        <div className='d-flex gap-3'>


                                            <div><p>{product.title}</p></div>
                                            <div><p>{product.productsInCart.quantity}</p></div>
                                            <div><p>{product.price}</p></div>


                                        </div>
                                    </div>

                                ))
                            }
                        </Card>
                    ))
                }


            </div>
        </div>
    );
};

export default Purchases;