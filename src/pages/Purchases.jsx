import React, { useEffect } from 'react';
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
            <ul>
                {
                    purchases.map(purchase => (
                        <li key={purchase.id}>
                            {purchase.cart?.products?.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;