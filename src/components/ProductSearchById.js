import { useContext, useEffect, useState } from "react"
import { Form, Button, Table } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ArchiveProduct from "./ArchiveProduct";
import UserContext from "../UserContext";
import ProductContext from "../ProductContext";


export default function ProductSearchById({updateProduct, addToCartHandler, getUpdatedProductList}) {

    const { user } = useContext(UserContext)
    const { productList } = useContext(ProductContext);
    const [productId, setProductId] = useState('');
    const [searchResult, setSearchResult] = useState({});

    const searchProductById = () => {
        if(productId === '') {
            setSearchResult([])
            return;
        }
        
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then((data) => {
            console.log('search by ID data', data)
            if(data) {
                setSearchResult([data]);
            }
        })
        .catch(error => {
            console.error('Error searching by ID:', error);
            setSearchResult([]); 
          });
        
        setProductId('');
    }

    useEffect(() => {
        setSearchResult([])
    }, [productList])

    return(
        <div>
            <div className="bg-warning p-3 mb-5">
                <Form className="d-flex justify-content-center">
                    <Form.Group className="mx-3 w-100" controlId="productId">
                        <Form.Control 
                            className="p-3"
                            type='text'
                            value={productId}
                            onChange={e => setProductId(e.target.value)}
                            placeholder='Input Product ID'
                            required
                        />
                    </Form.Group>
                    <Button variant="secondary" size="lg" onClick={searchProductById}>Search</Button>
                </Form>
            </div>


            
        {user.isAdmin && 
        <div>
        {searchResult.length > 0 && 
            <div>
            <h3>Search Result:</h3>
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
					{
                        searchResult.map(product => (
                            <>
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
                            </>
                        ))
                    }
				</tbody>
			</Table>	
            </div>}
        </div>}
        {!user.isAdmin && searchResult.length > 0 && <div>
            <h3 className="text-center">Search Result:</h3>
            <ProductCard addToCartHandler={addToCartHandler} productProp={searchResult[0]} />
        </div>}
        </div>
        
    )
}