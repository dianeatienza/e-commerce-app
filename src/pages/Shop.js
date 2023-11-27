import { useContext, useEffect, useState } from "react"
import ProductContext from "../ProductContext"
import ProductCard from "../components/ProductCard";
import { Container, Row } from "react-bootstrap";
import UserContext from "../UserContext";
import ProductSearchById from "../components/ProductSearchById";
import FooterSection from "../components/home/FooterSection";

export default function Shop() {

  const { productList, setProductList } = useContext(ProductContext)
  const { setUserDetails } = useContext(UserContext)
  const [products, setProducts] = useState([]);
  const [addToCartNotif, setAddToCartNotif] = useState(false)

  useEffect(() => {
    getUserDetails();
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
    .then(res => res.json())
    .then((data) => {
      console.log('data', data);

      setProductList(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const addToCartHandler = () => {
    setAddToCartNotif(true)

    const timeout = setTimeout(() => {
      setAddToCartNotif(false);
      clearTimeout(timeout)
    }, 1000)
  }

  useEffect(() => {
    setProducts(productList.map(product => {
      return <ProductCard productProp={product} addToCartHandler={addToCartHandler} />
    }))
  }, [productList])

  const getUserDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then((data) => {
        console.log('user data: ', data)
        setUserDetails(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

  return(
    <>
      <Container className="mt-5">
        <ProductSearchById addToCartHandler={addToCartHandler} />
        {addToCartNotif && <div className="alert alert-success cart-alert">Successfully added to cart.</div>}
        {/* <div className="alert alert-success cart-alert">Successfully added to cart.</div> */}

        <h3 className="text-center">All Products</h3>
        <Row>
          <div className="d-flex flex-wrap mx-2">
            {products}
          </div>
        </Row>
      </Container>
      <FooterSection />
     </>
  )
}