import { Form, Button, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
    const {user} = useContext(UserContext);
	const navigate = useNavigate();

	// State hooks to store the values of the input field
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("")
	const [mobileNo, setMobileNo] = useState("")
    const [shippingAddress, setShippingAddress] = useState("")
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    // State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName, 
                mobileNo: mobileNo,
                shippingAddress: shippingAddress,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('registration data: ', data);

            if (data) {
                setFirstName('');
                setLastName('');
                setMobileNo('');
                setShippingAddress('');
                setEmail('');
                setPassword('');

                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Successfully Registered",
                }).then(() => {
					navigate('/login')
				});
				
            } else {
                Swal.fire({
                    title: "Failed",
                    icon: "error",
                    text: "Registration is unsuccessful",
                });
            }
        })
    }
	
    useEffect(() => {
        if((firstName !== "" && lastName !== "" && mobileNo !== "" && shippingAddress !== "" & password !== "" && email !== "") && (mobileNo.length === 11)){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, mobileNo, shippingAddress, email, password])

    return(

        (user.id !== null) ?
			<Navigate to="/"/>
		:

		<Container className="mt-5">
			<Form onSubmit= {(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>
				<Form.Group>
					<Form.Label>First Name:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter First Name" 
					required
					value={firstName}
					onChange={e => {setFirstName(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Enter Last Name" 
					required
					value={lastName}
					onChange={e => {setLastName(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Mobile No:</Form.Label>
					<Form.Control 
					type="number" 
					placeholder="Enter 11 Digit No." 
					required
					value={mobileNo}
					onChange={e => {setMobileNo(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Shipping Address:</Form.Label>
					<Form.Control 
					type="text" 
					placeholder="Bldg # Subdivision Barangay City Province Zip No." 
					required
					value={shippingAddress}
					onChange={e => {setShippingAddress(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
					type="email" 
					placeholder="Enter Email" 
					required
					value={email}
					onChange={e => {setEmail(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
					type="password" 
					placeholder="Enter Password" 
					required
					value={password}
					onChange={e => {setPassword(e.target.value)}}
					/>
				</Form.Group>
				{isActive
					? <Button variant="primary" type="submit" className='my-3'>Submit</Button>

					: <Button variant="primary"  className='my-3' disabled>Submit</Button>
				}
			</Form>
		</Container>
    )
}