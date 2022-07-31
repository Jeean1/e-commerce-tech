import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const allProducts = useSelector(state => state.products)
    const [ productsDetail, setProductsDetail ] = useState([])
    const [ suggestedProducts, setSuggestedProducts ] = useState([])

    const {id} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        const productsFind = allProducts.find(productsItem => productsItem.id === Number(id))
        setProductsDetail(productsFind)

        const filteredProducts = allProducts.filter(productsItem => productsItem.category.id === productsFind.category.id)
        setSuggestedProducts(filteredProducts)
    }, [allProducts, id])

    

    return (
        <div>
            <h1>{productsDetail.title}</h1>
            <img src={productsDetail.productImgs} alt="" />
            <ul>
                {
                    suggestedProducts.map(products => (
                        <li onClick={() => navigate(`/products/${products.id}`)} key={products.id}>
                            {products.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductsDetail;