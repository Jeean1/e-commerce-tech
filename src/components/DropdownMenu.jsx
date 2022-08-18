import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getUserCart } from '../store/slices/products.slice';
import '../styles/dropDownMenu.css'
import { clearCartThunk, getUserCart, setCart } from '../store/slices/cart.slice';
import swal from 'sweetalert';

const DropdownMenu = () => {


    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)




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
        const toggleShow = () => {

            if (token) {

                setShow((s) => !s);

            } else {

                swal('You need logg in', 'To see the shopping cart you need logg in', 'warning')
                navigate('/login')





            }

        }


        return (
            <>
                <Button variant="primary" onClick={toggleShow} className="me-2" >
                    <i className="fa-solid fa-cart-shopping"></i>
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>




                        {
                            cart.map(product => (

                                <div className='cartProduct_Container' key={product.productsInCart.id} onClick={() => navigate(`/products/${product.id}`)}>
                                    <div>
                                        <p>{product.brand}</p>
                                        <p>{product.title}</p>
                                        <div className='productAmount'>
                                            {product.productsInCart.quantity}
                                        </div>
                                    </div>

                                    <div className='totalAmount'>
                                        <p>total</p>
                                        <strong>${product.price * product.productsInCart.quantity}</strong>
                                    </div>

                                </div>

                            ))
                        }




                        <div className='fixedTotal_Container'>

                            <div className='totalAmountFixed'>

                                <p>total</p>
                                <strong>${sumTotal()}</strong>

                            </div>

                            <Button onClick={clearCart}>Checkout</Button>
                        </div>


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



    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getUserCart())


    }, [])


    // console.log(cart)



    const sumTotal = () => {


        const total = []

        let quantity = 0


        for (let i = 0; i < cart.length; i++) {


            if (cart[i].price !== total[i]) {

                quantity = cart[i].price * cart[i].productsInCart.quantity

                total.push(Number(quantity))
            }

        }


        const totalPrice = total.reduce((x, i) => {

            return x + i

        }, 0)


        // console.log(quantity)

        return totalPrice


    }



    const clearCart = () => {


        if (cart.length !== 0) {

            swal('Successful purchase', '¡Congratulations!', 'success')

            dispatch(clearCartThunk())
            navigate('/purchases')
        } else {
            swal('cart is currently empty', 'You need add products', 'error')
        }

    }



    return (

        <div>

            <Example />


        </div>
    );
};

export default DropdownMenu;