import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";



export default function ArchiveProduct({product, onUpdate}) {

    const [isActive, setIsActive] = useState(product.isActive);

    const archiveProduct = (productId) => {
        console.log('productId', productId)

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify({
                isActive: false
            })
        })
        .then((response) => {
            if(response) {
                setIsActive(false);
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product Successfully Archived",
                  });
                onUpdate();
            } else {
                throw new Error("Failed to archive course");
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Please try again",
            });
        })
    }

    const activateProduct = (productId) => {
        console.log('productId', productId)

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify({
                isActive: true
            })
        })
        .then((response) => {
            if(response) {
                setIsActive(true);
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product Successfully Activated",
                });
                onUpdate();
            } else {
                throw new Error ('Failed to activate course')
            }
        })
        .catch((error) => {
            console.error(error)
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Please try again",
            });
        })
    }

    return(
        (isActive === true)
        ? (
            <Button variant="danger" size="sm" onClick={() => archiveProduct(product._id)}>Archive</Button>
        ) : (
            <Button variant="success" size="sm" onClick={() => activateProduct(product._id)}>Activate</Button>
        )
    )
}