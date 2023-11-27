import { Button, Modal } from "react-bootstrap";





export default function ProductViewModal({productProp, addToCart,showModal, onClose}) {
    const {_id, name, description, price, stockQuantity, images} = productProp;

    return(
        <>
            <Modal className="product-detail-modal" show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                <Modal.Title className="text-center">{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body  className="product-info">
                    <div className="image">
                        <img className='w-100' src={images[0]} alt="bag"/>
                    </div>

                    <div>
                        <div>
                            <strong>Product Id:</strong> {_id}
                        </div>
                        <div className="desc">
                            <strong>Description</strong>
                            <p>{description}</p>
                        </div>
                        <div>
                            <strong>Available Stocks:</strong> {stockQuantity}
                        </div>
                        <div>
                            <strong>Price:</strong>  ₱ {price}
                        </div>
                    </div>

                   
                </Modal.Body>
                <Modal.Footer> <Button onClick={addToCart} className="w-100 mt-3">Add to cart</Button></Modal.Footer>
            </Modal>
        </>
    )
}