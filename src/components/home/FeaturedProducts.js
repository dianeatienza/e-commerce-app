import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { CardGroup, Container } from "react-bootstrap";


export default function FeaturedProducts() {

    const [productCard, setProductCard] = useState([]);


    const generateRandomNumbers = (data) => {
        const arr = [];
        while(arr.length < 3){
            const r = Math.floor(Math.random() * data.length);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    } 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then( data => {
            const numbers = generateRandomNumbers(data);
            const featured = [];

            console.log(numbers)

            for(let i = 0; i < numbers.length; i++){
                featured.push(
                    <ProductCard productProp={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
                )
            }
            setProductCard(featured)
        })
        .catch((error) => {
            console.log('Error encountered', error);
            setProductCard([])
        })
    }, [])

    return(
        <Container>
            <h2 className="my-5 text-uppercase text-center"><span className="border-top border-bottom border-dark py-2 "><span className="text-warning" >Featured</span> Furniture</span></h2>
            <CardGroup>{productCard}</CardGroup>
        </Container>
    )
}