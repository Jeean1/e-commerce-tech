import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';

const ProductsDetail = () => {
  const allProducts = useSelector((state) => state.products);
  const [productsDetail, setProductsDetail] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [counter, setCounter] = useState(0);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  useEffect(() => {
    const productsFind = allProducts.find(
      (productsItem) => productsItem.id === Number(id)
    );
    setProductsDetail(productsFind);

    const filteredProducts = allProducts.filter(
      (productsItem) => productsItem.category.id === productsFind.category.id
    );
    setSuggestedProducts(filteredProducts);
  }, [allProducts, id]);

  const counterFunction = () => {
    if (counter === 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  };

  console.log(productsDetail)

  return (
    <div>
      <Carousel className="my-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productsDetail?.productImgs?.[0]}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productsDetail?.productImgs?.[1]}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={productsDetail?.productImgs?.[2]}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="flex-column">
        <h1 className="my-4 mx-4">{productsDetail?.title}</h1>
        <div className="d-flex">
          <div>
            <h3>Price</h3>
            <div>
              <p>$ {productsDetail?.price}</p>
            </div>
          </div>
          <div>
            <h3>Quantity</h3>
            <div className="d-flex quantity">
              <button onClick={counterFunction}>-</button>
              <p>{counter}</p>
              <button onClick={() => setCounter(counter + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <Button variant="primary" className="cart-btn">Add to Cart <i className="fa-solid fa-cart-shopping"></i></Button>
      <p className="description">{productsDetail?.description}</p>
      <ul>
        {suggestedProducts.map((products) => (
          <li
            onClick={() => navigate(`/products/${products.id}`)}
            key={products.id}
          >
            {products.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsDetail;
