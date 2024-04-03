import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { FaSpinner } from 'react-icons/fa'
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import ToastComponent from '../Components/ToastComponent'
import ToastTopComponent from '../Components/ToastTopComponent'
import placeholderImg from '../assets/img-product-placeholder.png'

const ProductCreate = () => {
    const initFormData = {
        productId: '',
        productName: '',
        description: '',
        productImage: '',
        qty: 0,
    }
    const [formData, setFormData] = useState(initFormData)

    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)

    const [isLoading, setLoading] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const [toastSuccess, setToastSuccess] = useState(false)
    const [toastError, setToastError] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN1
    const API_URL_UPLOAD_S3 = process.env.REACT_APP_BACKEND_ENDPOINT_S3

    const validatePidDigit5 = new RegExp('[0-9]{5}');

    const handleFileInput = (e) => {
        // console.log(e.target.files[0].name)
        setSelectedFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
        setFormData({
            ...formData,
            productImage: e.target.files[0].name
        })
    }

    const onChangeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        var validationErr = false
        var validationErrMsg = 'Validation Error : '
        if (!validatePidDigit5.test(formData.productId)) {
            validationErrMsg += 'Product Id must be 5 digits.'
            validationErr = true
        }

        if (formData.productName.length < 3) {
            validationErrMsg += 'Product name must be at least 3 char.'
            validationErr = true
        }
        if (formData.qty.length === 0) {
            validationErrMsg += 'Product Qty is required'
            validationErr = true
        } else if (isNaN(formData.qty)) {
            validationErrMsg += 'Product Qty must be number'
            validationErr = true
        } else {
            if (parseInt(formData.qty) < 0) {
                validationErrMsg += 'Product Qty must be >= 0'
                validationErr = true
            }
        }

        if (!validationErr) {
            try {
                // console.log(API_URL)
                setProcessing(true)
                // setLoading(true)

                if (selectedFile) {
                    //using api-gateway S3 upload
                    var config = {
                        method: 'put',
                        url: `${API_URL_UPLOAD_S3}${selectedFile.name}`,
                        headers: {
                            //   'Content-Type': 'image/png'
                            'Content-Type': selectedFile.type
                        },
                        data: selectedFile
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

                const response = await axios.post(`${API_URL}`, formData)
                if (response.status === 200) {
                    setToastSuccess(true)
                    setStatus(initStatus)
                    setTimeout(() => {
                        setFormData(initFormData)
                        setProcessing(false)
                        navigate('/')
                    }, 2000)
                } else {
                    setStatus({
                        ...status,
                        error: true,
                        errorMessage: response.message
                    })
                }
                setProcessing(false)
                // setLoading(false)
            } catch (error) {
                console.log(error)
                // setLoading(false)
                setProcessing(false)
                setToastError(true)
                setStatus({
                    error: true,
                    errorMessage: 'create error'
                })
                setTimeout(() => {
                    setToastError(false)
                }, 2000)
            }
        } else {
            setStatus({
                error: true,
                errorMessage: validationErrMsg
            })
        }
    }

    return (
        <>
            {toastSuccess && <ToastTopComponent text={'Added Successfully'} type={'success'} />}
            {toastError && <ToastTopComponent text={'Create : Error'} type={'error'} />}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100vh',
                }}
            >
                <div className='container'>
                    <br></br>
                    <section className='heading'>
                        <h1><BsFillFileEarmarkPlusFill /> Add New Product</h1>
                    </section>
                    <section className='form'>
                        {status.error && <div className='' style={{ color: 'red' }}>{status.errorMessage}</div>}
                        <form onSubmit={onSubmitHandler}>
                            <div className='form-group m-2'>
                                <div>
                                    <img alt="preview" src={image || placeholderImg} width={250} className='m-3' />
                                    <input type="file" accept="image/png, image/jpeg" onChange={handleFileInput} />
                                </div>
                            </div>
                            <div className='form-group m-2'>
                                <input
                                    type='text'
                                    id='productId'
                                    name='productId'
                                    value={formData.productId}
                                    placeholder='Enter product Id'
                                    onChange={onChangeHandler}
                                // required='required'
                                // pattern="[0-9]{5}"
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <input
                                    type='text'
                                    id='productName'
                                    name='productName'
                                    value={formData.productName}
                                    placeholder='Enter product name'
                                    onChange={onChangeHandler}
                                // required='required'
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <textarea
                                    id='description'
                                    name='description'
                                    rows={4}
                                    value={formData.description}
                                    placeholder='Enter description'
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className='form-group m-2'>
                                <input
                                    type='number'
                                    id='qty'
                                    name='qty'
                                    value={formData.qty}
                                    placeholder='Enter quantity'
                                    onChange={onChangeHandler}
                                    // required='required'
                                    min={0}
                                ></input>
                            </div>
                            <Button type='submit' className='primary m-2' disabled={(isLoading || isProcessing) ? true : false}>
                                Submit {isProcessing ? <FaSpinner className="icon_pulse" /> : ''}
                            </Button>
                            <Button variant='primary' onClick={() => navigate('/')} disabled={(isLoading || isProcessing) ? true : false}>Cancel</Button>
                        </form>
                    </section>
                </div>
            </div>
            <br></br>
        </>
    )
}

export default ProductCreate
