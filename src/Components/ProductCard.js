import { Button, Card, Badge } from 'react-bootstrap'
import placeholderImg from '../assets/img-product-placeholder.png'
import { useNavigate } from 'react-router-dom'

const ProductCard = (props) => {

    const item = props.item
    const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS
    const navigate = useNavigate();
    return (
        <>
            <div className='col-xs-12 col-sm-6 col-lg-4 col-xl-3'>
                <Card key={item.productId} style={{ width: 'auto', "margin": '3px' }}>
                    <Card.Img variant="top" src={item?.productImage ? `${API_URL_ASSETS}${item.productImage}` : placeholderImg} alt={item.productName} loading="lazy" />

                    <Card.Body>
                        <Card.Title>{item.productName}</Card.Title>
                        <Card.Text>
                            Product Id : {item?.productId} <br></br>
                            Qty : {item?.qty}
                            {(item?.qty < 10) &&
                                (<span className='m-1'>
                                    <Badge pill bg="warning" text="dark">
                                        Low Stock
                                    </Badge>{' '}
                                </span>)
                            }
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('product/' + item.productId)}>View</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ProductCard
