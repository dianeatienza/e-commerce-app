import { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import ProductContext from '../ProductContext'

import React from "react";
import ProductModalForm from "./ProductModalForm";
import ArchiveProduct from "./ArchiveProduct";
import ProductSearchById from "./ProductSearchById";

export default function ProductTable({ productsData, allProducts }) {

    const { productList, setProductList } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);


    const getUpdatedProductList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setProductList(data);
            console.log('productList', productList)
        })
        .catch((error) => {
            console.log('Error encountered', error);
            setProductList([])
        })
    }

    const updateProduct = (product) => {
        const productFormData = {
            productId: product._id,
            productName: product.name,
            productDesc: product.description,
            productPrice: product.price,
            productQuantity: product.stockQuantity,
            productImageUrl: product.images[0]
        }

        setFormData(productFormData);
        setShowModal(true);
    }

    const createProduct = () => {
        setFormData(null);
        setShowModal(true);
    }

    const onFormClose = () => {
        setFormData(null)
        setShowModal(false);
        getUpdatedProductList();
    }

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.discount}</td>
                    <td>{product.stockQuantity}</td>
                    <td className={product.isActive ? 'text-success' : 'text-danger'}>{product.isActive ? 'Available': 'Unavailable'}</td>
                    <td><Button variant="primary" size="sm" onClick={() => updateProduct(product)}>Update</Button></td>
                    <td><ArchiveProduct product={product} isProductActive={product.isActive} onUpdate={getUpdatedProductList} /></td>
                </tr>
            )
        })

        setProducts(productsArr)
    }, [productsData])


    return(

        <>
			<h1 className="text-center my-4"> Admin Dashboard</h1>
            <ProductSearchById updateProduct={updateProduct} getUpdatedProductList={getUpdatedProductList} />
            <div className="d-flex justify-content-end">
            
            <button class="btn btn-warning ml-auto mb-3" onClick={() => createProduct()}>Create Product [+] </button>
            </div>
            
			
			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th> 
						<th>Name</th>
						<th>Price</th>
						<th>Discount</th>
						<th>Stock Qty</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>	
            <ProductModalForm showForm={showModal} formData={formData} onClose={onFormClose}/>
		</>

    )
}