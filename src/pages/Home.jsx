import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsThunk,
  filterTitleThunk,
  filterCategoryThunk,
} from "../store/slices/products.slice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="mg-10">
      <Row>
        <Col lg={1} >
          <Button variant="primary" onClick={handleShow}>
            <i className="fa-solid fa-filter"></i>
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup className="categories-style">
                <h2>Categories</h2>

                {categories.map((category) => (
                  <ListGroup.Item
                    key={category.id}
                    onClick={() => dispatch(filterCategoryThunk(category.id))}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col className="mt-8">
          <h1>Home</h1>
          <div>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search product"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <Button
                variant="primary"
                onClick={() => dispatch(filterTitleThunk(searchValue))}
              >
                Search
              </Button>
            </InputGroup>
            <Row xs={1} s={2} md={3} className="g-4 container-products">
              {products.map((product) => (
                <Col key={product.id}>
                  <Card onClick={() => navigate(`/products/${product.id}`)} className="pointer">
                      <Card.Img variant="top" src={product.productImgs?.[1]} className="over" />
                      <Card.Img variant="top" src={product.productImgs} />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {product.title}
                      </Card.Title>
                      <div className="align-right">
                        <Button>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
