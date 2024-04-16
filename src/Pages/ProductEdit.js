import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { FaSpinner, FaEdit } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import ToastComponent from '../Components/ToastComponent'
import placeholderImg from '../assets/img-product-placeholder.png'
import { uploadFile } from 'react-s3'; //client upload
window.Buffer = window.Buffer || require("buffer").Buffer;

// using aws client upload 
// const S3_BUCKET = 'assetsawss3';
// const REGION = 'us-east-1';
// const ACCESS_KEY = '';
// const SECRET_ACCESS_KEY = '';

// const config = {
//     bucketName: 'assetsawss3',
//     region: 'us-east-1',
//     accessKeyId: '',
//     secretAccessKey: '',
// }


const ProductEdit = () => {
    let mount = useRef(true)
    const initFormData = {
        productId: '',
        productName: '',
        productDescription: '',
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
    const API_URL_GET = process.env.REACT_APP_BACKEND_DOMAIN2
    // const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS
    const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS_1
    const API_URL_ENDPOINT_S3 = process.env.REACT_APP_BACKEND_ENDPOINT_S3

    // const validatePidDigit5 = new RegExp('[0-9]{5}');

    const { id } = useParams()

    const handleFileInput = (e) => {
        console.log(e.target.files[0].name)
        setSelectedFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
        setFormData({
            ...formData,
            productImage: e.target.files[0].name
        })
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const get_api_url = API_URL_GET + id
            try {
                const response = await axios({
                    method: 'get',
                    url: get_api_url,
                })
                // console.log(response.data)
                setFormData(response.data)
                setImage(response.data.productImage)
                setImage(response.data.productImage ? `${API_URL_ASSETS}${response.data.productImage}` : placeholderImg)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log('err', err)
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
    }, [API_URL_GET, API_URL_ASSETS, id])

    const onChangeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            setProcessing(true)
            // setLoading(true)
            const response = await axios.put(`${API_URL}`, formData)
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
                    errorMessage: 'error'
                })
            }

            //using client upload
            // const handleUpload = async (file) => {
            //     uploadFile(file, config)
            //         .then(data => console.log(data))
            //         .catch(err => console.error(err))
            // }

            if (selectedFile) {
                // console.log('selected file:', selectedFile)
                // console.log('selected filename:', selectedFile.name)
                //using client upload
                //handleUpload(selectedFile)

                //using api-gateway S3 upload
                var config = {
                    method: 'put',
                    // url: 'https://tru0g8ptbg.execute-api.us-east-1.amazonaws.com/prod/pwt-bucket-s3/' + selectedFile.name,
                    url: `${API_URL_ENDPOINT_S3}${selectedFile.name}`,
                    headers: {
                        //   'Content-Type': 'image/png'
                        'Content-Type': selectedFile.type
                    },
                    data: selectedFile
                };

                // axios(config)
                //     .then(function (response) {
                //         console.log(JSON.stringify(response.data));
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });

                try {
                    const res = await axios(config)
                    if (res.status === 200) {
                        console.log('Update image success')
                    }
                } catch (err) {
                    console.log('image upload error', err)
                }
            }

            setProcessing(false)
            // setLoading(false)
        } catch (error) {
            console.log(error)
            setToastError(true)
            setStatus({
                error: true,
                errorMessage: error.response.data.message
            })
            setProcessing(false)
            // setLoading(false)
            setTimeout(() => {
                setToastError(false)
            }, 2000)
        }
    }

    return (
        <>
            {toastSuccess && <ToastComponent text={'Update Successfully'} type={'success'} position={'top-end'} />}
            {toastError && <ToastComponent text={'Update Error'} type={'error'} position={'top-end'} />}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100vh',
                }}
            >
                <div className='container'>
                    <section className='heading'>
                        <h1 className='mt-5'><FaEdit /> Edit Product</h1>
                    </section>
                    <section className='form'>
                        <form onSubmit={onSubmitHandler}>
                            <div className='form-group m-2'>
                                <div>
                                    <img alt="preview" src={image || placeholderImg} width={250} className='m-3' />
                                    <input type="file" accept="image/png, image/jpeg" onChange={handleFileInput} />
                                </div>
                                <label htmlFor="productId">Product Id:</label>
                                <input
                                    type='text'
                                    id='productId'
                                    name='productId'
                                    value={formData.productId}
                                    placeholder='Enter product Id'
                                    onChange={onChangeHandler}
                                    disabled={true}
                                    required='required'
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <label htmlFor="productName">Product Name:</label>
                                <input
                                    type='text'
                                    id='productName'
                                    name='productName'
                                    value={formData.productName}
                                    placeholder='Enter product name'
                                    onChange={onChangeHandler}
                                    required='required'
                                ></input>
                            </div>
                            <div className='form-group m-2'>
                                <label htmlFor="description">Description:</label>
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
                                <label htmlFor="qty">Qty:</label>
                                <input
                                    type='number'
                                    id='qty'
                                    name='qty'
                                    value={formData.qty}
                                    placeholder='Enter quantity'
                                    onChange={onChangeHandler}
                                    required='required'
                                    min={0}
                                ></input>
                            </div>
                            <Button type='submit' className='primary m-2' disabled={(isLoading || isProcessing) ? true : false}>
                                Update {isProcessing ? <FaSpinner className="icon_pulse" /> : ''}
                            </Button>
                            <Button variant='primary' onClick={() => navigate('/product/' + formData.productId)} disabled={(isLoading || isProcessing) ? true : false}>Cancel</Button>
                        </form>
                    </section>
                    <br></br>
                </div>
            </div>
        </>
    )
}

export default ProductEdit
