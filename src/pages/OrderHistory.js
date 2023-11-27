import { Container } from "react-bootstrap";
import RetrieveAllOrders from "../components/RetrieveAllOrders";


export default function OrderHistory() {
    return(
        <Container className="mt-5">
            <RetrieveAllOrders />
        </Container>
    )
}