import { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CheckOutOrder from './CheckOutOrder';
import UserContext from '../UserContext';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import ProductViewModal from './ProductViewModal';

export default function ProductCard({productProp, addToCartHandler}) {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const {_id, name, description, price, images} = productProp;

    const [count, setCount] = useState(0);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const addToCart = () => {
        if(!user.id) {
            navigate('/login');
            return;
        }


        addToCartHandler();
        fetch(`${process.env.REACT_APP_API_URL}/cart/add-product`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: _id,
                quantity: quantity === 0 ? 1 : quantity
            })
        })
    }

    const increment = () => {
        setCount(count + 1)

        setQuantity(count + 1)
    }

    const decrement = () => {
        if(count > 0)
        setCount(count - 1)

        setQuantity(count - 1)
    }

    const onViewModalClose = () => {
        setShowViewModal(false)
    }

    const onClose = () => {
        setShowCheckoutModal(false)
        setQuantity(0);
        setCount(0);
    }

    return(
        <>
            <Card className='product-card p-1 my-2 mx-2'>
                <div>
                    <img className='w-100' src={images[0]} alt="bag"/>
                </div>
                <Card.Title className='text-uppercase text-center fs-6'>{name}</Card.Title>
                <Card.Body>
                    <Card.Text className="desc">{description}</Card.Text>
                    <Card.Subtitle className='product-price text-danger'>₱ {price}</Card.Subtitle>
                    
                <div className='text-center d-flex justify-content-between items-center mt-3'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Card.Subtitle>Quantity:</Card.Subtitle>
                        <Button className='btn-secondary btn-sm mx-3 my-2' onClick={decrement}><FaMinus /></Button> 
                        <Card.Text className='m-0'>{count}</Card.Text>
                        <Button className='btn-secondary btn-sm mx-3 my-2' onClick={increment}><FaPlus /></Button>  
                    </div>
                    <div>
                        <Button className="btn btn-primary btn-sm mx-2" onClick={addToCart} ><FaShoppingCart /> </Button>
                        <Button className="btn btn-warning btn-sm" onClick={(e) => setShowCheckoutModal(true)}>Buy Now</Button>
                    </div>
                </div>
                <Button className='btn mt-3 w-100' onClick={() => setShowViewModal(true)}>View Product</Button>
                    
                </Card.Body>
            </Card>
            <CheckOutOrder showModal={showCheckoutModal} onClose={onClose} product={productProp} quantity={quantity}/>
            <ProductViewModal showModal={showViewModal} onClose={onViewModalClose} addToCart={addToCart} productProp={productProp} />
        </>
    )
}




ProductCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specific "shape:
	course: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}