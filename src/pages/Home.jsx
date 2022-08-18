import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTitleThunk } from "../store/slices/products.slice";
import { useNavigate } from "react-router-dom";

import { Button, Card, Col, Row, Form, InputGroup } from 'react-bootstrap'
import { CategoriesBttn } from "../components";

const Home = () => {





  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const products = useSelector((state) => state.products);





  return (
    <div className="mg-10 container">
      <Row>
        <Col lg={2}>




          <CategoriesBttn />
        </Col>


        {/* 

                    https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth

                    https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth

                    https://bobbyhadz.com/blog/react-get-window-width-height#:~:text=To%20get%20the%20width%20and,window%20in%20a%20state%20variable



         */}

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
      </Row >
    </div >
  );
};

export default Home;
