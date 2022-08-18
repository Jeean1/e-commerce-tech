

import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { filterCategoryThunk, getProductsThunk } from '../store/slices/products.slice';

const CategoriesBttn = () => {

    const dispatch = useDispatch()

    const [categories, setCategories] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        dispatch(getProductsThunk());
        axios
            .get(
                "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
            )
            .then((res) => setCategories(res.data.data.categories));
    }, []);


    const windowCategories = () => {

        const windoWeight = window.innerWidth

        // console.log(windoWeight)

        if (windoWeight > 992) {
            return (

                <>
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
                </>

            )
        } else {

            return (
                <div className="categoryContainer">

                    <Col lg={1} className='desktop' >
                        <Button variant="primary" onClick={handleShow} >
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
                </div>
            )

        }


    }


    return (

        // <div className="categoryContainer">

        //     <Col lg={1} className='desktop' >
        //         <Button variant="primary" onClick={handleShow} >
        //             <i className="fa-solid fa-filter"></i>
        //         </Button>
        //         <Offcanvas show={show} onHide={handleClose}>
        //             <Offcanvas.Header closeButton>
        //                 <Offcanvas.Title>Filters</Offcanvas.Title>
        //             </Offcanvas.Header>
        //             <Offcanvas.Body>
        //                 <ListGroup className="categories-style">
        //                     <h2>Categories</h2>

        //                     {categories.map((category) => (
        //                         <ListGroup.Item
        //                             key={category.id}
        //                             onClick={() => dispatch(filterCategoryThunk(category.id))}
        //                         >
        //                             {category.name}
        //                         </ListGroup.Item>
        //                     ))}
        //                 </ListGroup>
        //             </Offcanvas.Body>
        //         </Offcanvas>
        //     </Col>
        // </div>


        windowCategories()

    );
};

export default CategoriesBttn;