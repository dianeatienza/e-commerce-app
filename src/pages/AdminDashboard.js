import { useContext, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import ProductContext from "../ProductContext";
import { Container } from "react-bootstrap";


export default function AdminDashboard() {

    const { productList, setProductList } = useContext(ProductContext)

    const allProducts = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProductList(data);
        })
        .catch((error) => {
            console.log('Error encountered', error);
            setProductList([])
        })
    }

    useEffect(() => {
		allProducts()
	}, []);


    return(
        <Container>  
            <ProductTable productsData={productList}/>
        </Container>
    )
}