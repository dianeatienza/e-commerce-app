import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext";
import { Table } from "react-bootstrap";


export default function RetrieveAllOrders() {

    const [orders, setOrders] = useState([])
    const {user} = useContext(UserContext); 

    const retrieveAllUserOrders = () => {
        fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then (data => {
            console.log(data)

            setOrders(data.map(item => (<>
                <tr>
                    <td>{item._id}</td>
                    <td>{item.userId}</td>
                    <td>{item.products.map(product => <div>{product.productId.name}</div>)}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.purchasedOn}</td>
                </tr>
            </>
            )))

        })
    }

    const retrieveUserOrder = () => {
        fetch(`${process.env.REACT_APP_API_URL}/orders`, {
            method: 'GET', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then (data => {
            console.log(data)

            setOrders(data.map(item => (<>
                <tr>
                    <td>{item._id}</td>
                    <td>{item.products.map(product => <div>{product.productId.name}</div>)}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.purchasedOn}</td>
                </tr>
            </>
            )))

        })
    }

    useEffect(() => {
        console.log('from orders',user)
        if(user.isAdmin) {
            retrieveAllUserOrders()
        } else {
            retrieveUserOrder()
        }
    }, [user]);

    return(
        <div>
            {user.isAdmin && <h2 className="mb-5 text-center">All Users' Orders</h2>}
            {!user.isAdmin && <h2 className="mb-5 text-center">Order History</h2>}
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        {user.isAdmin && <th>User ID</th>}
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Purchased On</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </Table>
        </div>
    )
}