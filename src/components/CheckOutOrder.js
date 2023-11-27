import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import Swal from "sweetalert2";



export default function CheckOutOrder({showModal, onClose, product, cart, quantity}) {

    const {userDetails} = useContext(UserContext);


    const checkoutOrderFromCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/checkout`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log('checkedout cart',data)
            showSwal(data);
            onClose();
        })
    }

    const showSwal = (data) => {
        if(!userDetails.isAdmin){
            if(data.auth === 'Failed') {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Make sure you are logged in.'
                })
                
            } else if (data.success) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success', 
                    text: 'Order successful!'
                })
            }
        } else {
            Swal.fire({
                title:  'Please use your user account',
                icon: 'error',
                text: 'Admin account is not allowed to create order'
            })
        }
    }

    const checkOutOrder = () => {
        let products = [
            {
                productId: product._id,
                quantity
            }
        ];


        if(quantity > 0) {
            fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    products: products
                })
            })
            .then(res => res.json())
            .then((data) => {
                console.log('checkout order data:', data)

                showSwal(data);

                onClose();
            })
        } else {
            Swal.fire({
                title: 'Order Canceled',
                icon: 'error',
                text: 'Indicate the quantity'
            })
        }
        
    }
    
    return(
        <div>
           <Modal show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                <Modal.Title className="text-center">Order Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Customer Details</h4>
                    <div className="modal-info mb-3">
                        <div className="text-capitalize"><strong>Name:</strong> {`${userDetails.firstName} ${userDetails.lastName}`}</div>
                        <div className="text-capitalize"><strong>Contact Number:</strong> {userDetails.mobileNo}</div>
                        <div className="text-capitalize"><strong>Address:</strong> {userDetails.shippingAddress}</div>
                    </div>
                    <hr />
                    <h4>Orders</h4>
                    <div className="checkout-order-list">
                        {(product) ? (
                            <div>
                                <div className="modal-product-info">
                                    <div className="info-label">Product Name:</div>
                                    <div className="info-value">{product.name}</div>
                                    <div className="info-label">Price:</div>
                                    <div className="info-value">{product.price}</div>
                                    <div className="info-label">Quantity:</div>
                                    <div className="info-value">{quantity}</div>
                                    <div className="info-label">TOTAL AMOUNT:</div>
                                    <div className="info-value total-amount align-items-center">₱{product.price*quantity}</div>
                                </div>
                            </div>
                        ): (
                            <>
                                {cart.products.map(cartItem => cartItem.isSelected && (
                                    <div className="modal-product-info mb-2 rounded border border-dark p-3">
                                        <div className="text-capitalize"><strong>Product Name:</strong> {cartItem.productId.name}</div>
                                        <div className="text-capitalize"><strong>Price:</strong> {cartItem.productId.price}</div>
                                        <div className="text-capitalize"><strong>Quantity:</strong> {cartItem.quantity}</div>
                                        <div className="text-capitalize"><strong>Sub Total:</strong> {cartItem.subTotal}</div>
                                    </div>
                                    )
                                )}
                                
                            </>
                            
                        )
                        
                        
                        }
                    </div>
                    {cart && (<>
                        <div className="text-center mt-3 info-label">TOTAL AMOUNT: <span className="text-success">₱{cart.totalPrice}</span></div>
                    </>) }
                    

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="warning" onClick={onClose}>Cancel</Button>
                    {product && <Button variant='success' type="Submit" onClick={checkOutOrder}>Confirm</Button>}
                    {cart && <Button variant='success' type="Submit" onClick={checkoutOrderFromCart}>Confirm</Button>}
                </Modal.Footer>
           </Modal>
        </div>
    )
}