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

  return (
    <div className="mg-10">
      <Row>
        <Col lg={3}>
          <h2>Categories</h2>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item 
                key={category.id} 
                onClick={() => dispatch(filterCategoryThunk(category.id))}
            >
                {category.name}
            </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
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
            <Row xs={1} s={2} md={3} className="g-4">
              {products.map((product) => (
                <Col key={product.id}>
                  <Card>
                    <Card.Img variant="top" src={product.productImgs} />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {product.title}
                      </Card.Title>
                      <Button
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        Check Product
                      </Button>
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
