import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  return (
    <div className="mg-2rem">
      <div>
        <Row xs={1} s={2} md={2} lg={2}>
            <Col>
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
            </Col>
            <Col>
              <div className="flex-column">
                <h2 className="my-4 mx-4">{productsDetail?.title}</h2>
                <p className="description">{productsDetail?.description}</p>
                <div className="d-flex my-4">
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
              <Button variant="primary" className="cart-btn">
                Add to Cart <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </Col>
        </Row>
      </div>
      <h3 style={{ color: '#f85555' }} className="my-4">Discover similar products</h3>
      <Row  xs={1} s={2} md={3}>
        {suggestedProducts.map((products) => (
          <div
            onClick={() => navigate(`/products/${products.id}`)}
            key={products.id}
          >
            <Card onClick={() => navigate(`/products/${product.id}`)} className="pointer my-3">
                      <Card.Img variant="top" src={products.productImgs?.[1]} className="over" />
                      <Card.Img variant="top" src={products.productImgs} />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {products.title}
                      </Card.Title>
                      <div className="align-right">
                        <Button>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default ProductsDetail;
