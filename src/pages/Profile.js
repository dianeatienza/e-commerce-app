import { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap"
import UserContext from "../UserContext";

export default function Profile() {
    const {userDetails} = useContext(UserContext);
    
	// State hooks to store the values of the input field
	const [firstName, setFirstName] = useState(userDetails.firstName);
	const [lastName, setLastName] = useState(userDetails.lastName)
	const [mobileNo, setMobileNo] = useState(userDetails.mobileNo)
    const [shippingAddress, setShippingAddress] = useState(userDetails.shippingAddress)
    const [email, setEmail] = useState(userDetails.email)

    useEffect(() => {
        console.log('profile', userDetails)
    })

    return (
        <Container>
            <Form>
            <h1 className="my-5 text-center">My Account</h1>
                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    disabled={true}
                    value={firstName}
                    onChange={e => {setFirstName(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    disabled={true}
                    value={lastName}
                    onChange={e => {setLastName(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mobile No:</Form.Label>
                    <Form.Control 
                    type="number" 
                    required
                    disabled
                    value={mobileNo}
                    onChange={e => {setMobileNo(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Shipping Address:</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    disabled
                    value={shippingAddress}
                    onChange={e => {setShippingAddress(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type="email" 
                    required
                    disabled={true}
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    />
                </Form.Group>
        </Form>
        </Container>
    )
}