import { Button, Container, Table } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { useContext, useEffect, useState } from "react";
import CheckOutOrder from "../components/CheckOutOrder";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Cart() {
    const { user} = useContext(UserContext)

    const [userCart, setUserCart] = useState({products: []});
    const [showModal, setShowModal] = useState(false);

    const getCartData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setUserCart(data[0]);
        })
    }

    const onCartItemChange = () => {
        getCartData()
    }


    useEffect(() => {
        getCartData()
    }, [])

    const onClose = () => {
        setShowModal(false);
        getCartData();
    }


    return(
        (
            user.id == null ? <Navigate to='/login' /> : (
                user.isAdmin ? <><h1 className="text-center m-5">This feature is not available for admins. Please use your user account. </h1></> : <Container>
                <h1 className="text-center mt-3 mb-5">My Cart</h1>
    
    
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Sub Total</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { userCart.products.length === 0 && <tr><td colSpan={6} className="text-center">Your Cart is Empty</td></tr> }
                        { userCart.products.map(product => <CartItem key={product.productId._id} productProp={product} onCartItemChange={onCartItemChange} />) }
                    </tbody>
                </Table>
                <div className="lead fw-bold d-flex justify-content-between mt-3">
                    <span className="border border-dark p-3">Total Price: P {userCart.totalPrice}</span>
                    { userCart.products.length > 0 && <Button onClick={() => setShowModal(true)}>Proceed to Checkout</Button> }
                </div>
                <CheckOutOrder cart={userCart} showModal={showModal} onClose={onClose} />
            </Container>

            )
            
    
        )

        
    )
}