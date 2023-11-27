import { Container } from "react-bootstrap";


export default function AboutUs() {
    return(
        <Container >
            <div className="my-3">
                <h2 className="mt-5 mb-4 text-uppercase text-center"><span className="border-top border-bottom border-dark py-2 "><span className="text-warning" >Established</span> since 1997</span></h2>

                <div className="mb-3">
                <img
                    src='/housethetics-logo2.png'
                    alt='Housethetics Logo' 
                    className=""
                    style={{
                        width: '300px',
                        height: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        margin: 'auto'
                    }}
                />
                </div>

                <div className="text-center">
                    <p>Housethetics Furniture has established itself as a well-regarded furniture company since 1997, offering a collection of opulent furniture that seamlessly combines innovation, modern aesthetics, durability, and affordability. Our extensive range includes sofa sets, dining sets, wardrobe cabinets, bed frames, storage racks, tables, recliners, and shoe closets. Our commitment is to stay at the forefront of the furniture industry by embracing change, fostering innovation, maintaining excellent customer relations, and delivering contemporary furniture solutions.</p>

                    <p>Please note that this text has been composed by ChatGPT and is intended solely for personal portfolio purposes. </p>
                    <p>Moreover, this website is inspired by Urban Concepts // www.urbanconcepts.ph</p>
                </div>
            </div>
        </Container>
    )
}