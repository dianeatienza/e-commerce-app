import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function CartItem({productProp, onCartItemChange}) {

    const [count, setCount] = useState(productProp.quantity);
    const [checked, setChecked] = useState(productProp.isSelected);
    const [productDetails] = useState(productProp.productId);


    const increment = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/add-product`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productDetails._id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setCount(count+1)
            }
        })

    }

    useEffect(() => {
        onCartItemChange()
    }, [count])


    const toggleCart = (selected) => {
        console.log('selected',selected)
        let endpoint = "select";
        if(!selected) {
            endpoint = "unselect";
        }
        setChecked(!checked);
        fetch(`${process.env.REACT_APP_API_URL}/cart/${productDetails._id}/${endpoint}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(() => {
            onCartItemChange()
        })
        .catch((error) => {
            console.log('Error encountered', error);
        })
    }

    const removeItem = () => {
        removeProduct(productProp.quantity)
    }

    const removeProduct = (quantity) => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/remove-product`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productDetails._id,
                quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                if(count - 1 === 0) {
                    onCartItemChange();
                }

                setCount(count - 1)
            }
        })
        .catch((error) => {
            console.log('Error encountered', error);
        })
    }

    const decrement = () => {
        if(count === 0) return
        removeProduct(1);
        

    }

    return (
        <>
            <tr className={`align-middle cart-item ${checked ? 'table-light' : ''}`}>
                <td>
                    <div>
                        <input type="checkbox" checked={checked} onChange={(e) => toggleCart(e.target.checked)} /> 
                    </div>
                </td>
                <td className="text-capitalize">{productDetails.name}</td>
                <td>{productDetails.price}</td>
                <td>{productProp.subTotal}</td>
                <td>
                    <div className="d-flex item-center justify-content-center">
                        <div className="quantity-counter d-flex items-center  mx-3">
                            <button onClick={decrement}>-</button>
                            <div className="text-sm px-2">{count}</div>
                            <button onClick={increment}>+</button>
                        </div>
                        <div>
                            <Button className="btn-danger" onClick={removeItem}>Remove</Button>
                        </div>
                    </div>
                </td>
            </tr>


            {/* <div className="cartItem d-flex justify-content-between">
                <div className="product-details flex-grow-1 d-flex justify-content-between">
                    <div>
                        <div>Product Name</div>
                        <div>Quantity: 12</div>
                    </div>
                    <div>
                        <div>Price: 1</div>
                        <div>Sub Total: 100</div>
                    </div>
                </div>
                <div className="product-actions">
                    <div className='d-flex align-items-center'>
                        <Button className='btn-success btn-sm mx-3 my-2' onClick={decrement}>-</Button> 
                        <div className='lead m-0'>{count}</div>
                        <Button className='btn-success btn-sm mx-3 my-2' onClick={increment}>+</Button>  
                    </div>
                    <input type="checkbox" />
                </div>
            </div> */}

        </>
    )
}