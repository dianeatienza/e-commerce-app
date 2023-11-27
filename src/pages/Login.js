import { Form, Button, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



export default function Login() {
    
    const { user, setUser, setUserDetails } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    function authenticate(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(typeof data.access !== 'undefined') {
                localStorage.setItem('token', data.access);
                
                console.log('data', data)

                retrieveUserDetails(data.access)
                setUser({
                    access: localStorage.getItem('token')
                })

                Swal.fire({
                    title: "Login Succesful",
                    icon: "success",
                    timer: 1000,
                    text: "Welcome to Housethetics!"
                });
                navigate('/')
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        })
        setEmail('')
	    setPassword('')
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('retrieved user details: ',data)
            setUserDetails(data)
            setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
        })
    }

    useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email,password]);

    return(
        (user.id) ?
        <Navigate to='/' /> 
        :
        <Container>
            <Form onSubmit ={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                <Form.Label>Email address *</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required				
                />
                </Form.Group>
                <Form.Group controlId="userPassword">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </Form.Group>
                {isActive ?
                <Button variant="primary" type="submit" id="submitBtn" className='my-3'>Submit</Button>
                :
                <Button variant="primary" type="submit" id="submitBtn" className='my-3' disabled>Submit</Button>

                }
            </Form>
        </Container>
    )
}