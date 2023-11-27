import { useState, useEffect } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductModalForm({showForm, formData, onClose}) {


    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(showForm);




    const updateProduct = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stockQuantity: quantity,
                imageUrl: imageUrl
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('data under update product:', data)

            if (data === true){
                Swal.fire({
                    timer: 800,
                    title: 'Success!',
                    icon: 'success', 
                    text: 'Product Successfully Updated'
                })
                
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })
               
            }
            closeForm()
        })
    }

    const createProduct = () => {
		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_URL}/products/`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				price: price, 
                description: description,
                stockQuantity: quantity,    
                imageUrl: imageUrl
			})
		})
		.then(res => res.json())
		.then(data => {

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);

			if(data){
				Swal.fire({
                    timer: 800,
					icon:"success",
					title: "Successfully added product!"

				})

				navigate("/adminDashboard");
			} else {
				Swal.fire({

					icon: "error",
					title: "Unsuccessfully added product",
					text: data.message

				})
			}
            closeForm()

		})
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(id) {
            updateProduct();
        } else {
            createProduct();
        }
    } 

    const closeForm = () => {
        setId(null)
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImageUrl('');
        setShowModal(false);
 
        onClose();
    }

    useEffect(() => {
        setShowModal(showForm)
        if(formData){
            const {productId, productName, productDesc, productPrice, productQuantity, productImageUrl} = formData;
            setId(productId);
            setName(productName);
            setDescription(productDesc);
            setPrice(productPrice)
            setQuantity(productQuantity)
            setImageUrl(productImageUrl)
        }
    }, [showForm, formData])

    return(
        <>
             <Modal show={showModal} onHide={closeForm}>
                <Form onSubmit={e => handleFormSubmit(e)}>
                    <Modal.Header closeButton>
                        {id && <Modal.Title>Update Product</Modal.Title>}
                        {!id && <Modal.Title>Add Product</Modal.Title>}
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="productImageUrl">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control 
                                type='text'
                                value={imageUrl}
                                onChange ={e => setImageUrl(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control 
                                type='text'
                                value={name}
                                onChange ={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text" 
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productQuantity">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control
                                type="text" 
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" size="sm" onClick={closeForm}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    )
}