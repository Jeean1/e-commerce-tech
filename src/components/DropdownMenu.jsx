import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { getUserCart } from '../store/slices/products.slice';
import '../styles/dropDownMenu.css'

const DropdownMenu = () => {


    const options = [

        {
            name: 'Enable both scrolling & backdrop',
            scroll: true,
            backdrop: true,
        }
    ];



    function OffCanvasExample({ name, ...props }) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const toggleShow = () => setShow((s) => !s);

        return (
            <>
                <Button variant="primary" onClick={toggleShow} className="me-2">
                    <i className="fa-solid fa-cart-shopping"></i>
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        Aquí se mostrarán los productos qué agregue el user al carrito

                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }


    function Example() {
        return (
            <>
                {options.map((props, idx) => (
                    <OffCanvasExample key={idx} {...props} />
                ))}
            </>
        );
    }

    // render(<Example />);


    const dispatch = useDispatch()


    // useEffect(() => {

    //     dispatch(getUserCart())


    // }, [])






    return (

        <div>

            <Example />


        </div>
    );
};

export default DropdownMenu;