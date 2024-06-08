import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
// import DataTable from 'react-data-table-component'
import { useParams, useNavigate } from 'react-router'
import { Button, Card, Modal } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt, FaSpinner, FaTrashAlt } from 'react-icons/fa'
import ToastComponent from '../Components/ToastComponent'
import placeholderImg from '../assets/img-product-placeholder.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Checkbox from '../Components/Checkbox';

const ProductView = () => {
    const initProduct = {
        productId: '',
        productName: '',
        qty: 0,
        isActive: false
    }

    let mount = useRef(true)
    const [product, setProduct] = useState(initProduct)
    const [isLoading, setLoading] = useState(false)
    const [toastSuccess, setToastSuccess] = useState(false)
    const [toastError, setToastError] = useState(false)

    const initStatus = {
        error: false,
        errorMessage: ''
    }

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [status, setStatus] = useState(initStatus)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN2
    const API_URL_PRODUCT = process.env.REACT_APP_BACKEND_DOMAIN1
    // const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS
    const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS_1

    const { id } = useParams()

    const onDeleteHandler = async (pid) => {
        setShowModal(false)
        try {
            setLoading(true)
            const response = await axios.delete(`${API_URL_PRODUCT}`, { data: { productId: pid } })
            // console.log(response)
            if (response.status === 200) {
                setToastSuccess(true)
                setTimeout(() => {
                    setStatus(initStatus)
                    navigate('/')
                }, 2000)
            } else {
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: response.message
                })
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                navigate('/login')
            }
            setToastError(true)
            setStatus({
                error: true,
                errorMessage: 'delete error'
            })
            setLoading(false)
            setTimeout(() => {
                setToastError(false)
            }, 2000)
        }
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await axios({
                    method: 'get',
                    url: API_URL + id,
                    //headers: {'x-api-key': 'your api key'}      
                })
                setProduct(response.data)
                setLoading(false)
            } catch (err) {
                // console.log('err', err)
                if (err.response.status === 401) {
                    navigate('/login')
                }
                setLoading(false)
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: err.response.data.message
                })
            }
        }
        if (mount.current) {
            getData()
        }
        return () => {
            mount.current = false
        }
    }, [API_URL, id])

    return (
        <>
            {toastSuccess && <ToastComponent text={'Delete Successfully'} type={'success'} position={'top-end'} />}
            {toastError && <ToastComponent text={'Delete Error'} type={'error'} position={'top-end'} />}
            <div className='full-page-ctn'>
                <Container>
                    <Row>
                        <Col xs>
                            {isLoading ?
                                <div><FaSpinner /></div>
                                : <div>
                                    <img className="" src={product?.productImage ? `${API_URL_ASSETS}${product.productImage}` : placeholderImg} alt={product.productName} />
                                </div>
                            }

                        </Col>
                        <Col xs>
                            <div>
                                <h4 className="card-title">{!isLoading ? product.productName : <FaSpinner className="icon_pulse" />}</h4>
                                <p className="card-text">Product Id : {!isLoading ? product.productId : ""}</p>
                                <p className="card-text">Qty : {!isLoading ? product.qty : ""}</p>
                                <p className="card-text">Description : {!isLoading ? product?.description : ""}</p>
                                <p>
                                    <label>
                                        <span className='mx-2'>Active :</span>
                                        {!isLoading &&
                                            <Checkbox name="isActive" disabled={true} checked={product.isActive}/>
                                        }
                                    </label>
                                </p>
                                <span className='icon'><FaRegEdit onClick={() => navigate('/product/edit/' + product.productId)} /></span>
                                <span className='danger' style={{ "marginLeft": "8px" }}><FaRegTrashAlt onClick={handleShow} /></span>
                            </div>
                            <Row>
                                <Button variant="primary" className='m-2' onClick={() => navigate('/')} disabled={isLoading}>Back</Button>
                                {/* <Button variant="primary" className='m-2' onClick={() => navigate('/product/edit/' + product.productId)}>EDIT</Button>
                                <Button variant="danger" className='m-2' onClick={() => onDeleteHandler(product.productId)}>Delete</Button> */}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><FaTrashAlt /> Delete record?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => onDeleteHandler(product.productId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductView
