import { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FaSpinner, FaList, FaBuromobelexperte, FaFileCsv } from 'react-icons/fa'
import SearchBar from '../Components/Searchbar'
import ProductCard from '../Components/ProductCard'
import exportFromJSON from 'export-from-json'
import { getSessionToken } from '../Services/userSession'

axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_BACKEND_API_KEY;

const ProductList = () => {
    let mount = useRef(true)
    const initViewType = 'Card View'
    const [viewType, setViewType] = useState(initViewType);
    const [productList, setProductList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN
    // const API_URL_ASSETS = process.env.REACT_APP_BACKEND_ASSETS
    const navigate = useNavigate();
    const token = getSessionToken();
    axios.defaults.headers['Authorization'] = token;

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await axios({
                    method: 'get',
                    url: API_URL,
                })
                setProductList(response.data.products)
                setLoading(false)
            } catch (err) {
                console.log('err', err)
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: err.response.data.message
                })
                setLoading(false)
            }
        }
        if (mount.current) {
            getData()
        }
        return () => {
            mount.current = false
        }
    }, [API_URL])

    const columns = [
        // {
        //     name: 'ID',
        //     selector: row => row._id,
        //     sortable: true,
        // },
        {
            name: 'Product Id',
            selector: row => row.productId,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true,
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.toggleSelected,
            style: {
                backgroundColor: "#E6E6FF",
                userSelect: "none"
            }
        }
    ];

    const handleRowClicked = row => {
        if (row.productId) {
            setTimeout(() => {
                navigate('product/' + row.productId)
            }, 500)
        }
        const updatedData = productList.map(item => {
            if (row.productId !== item.productId) {
                return item;
            }

            return {
                ...item,
                toggleSelected: !item.toggleSelected
            };
        });

        setProductList(updatedData);
    };

    const [keyword, setKeyword] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = productList.filter(
        item => item.productName && item.productName.toLowerCase().includes(keyword.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            // console.log('parent')
            if (keyword) {
                setResetPaginationToggle(!resetPaginationToggle);
                setKeyword('');
            }
        };

        return (
            <SearchBar keyword={keyword} setKeyword={setKeyword} onClear={handleClear} />
            // <SearchBar keyword={keyword} setKeyword={e => setKeyword(e.target.value)}/>
        );
    }, [keyword, resetPaginationToggle]);

    const onExportCsv = () => {
        const dataTmp = [...productList]
        const data = dataTmp.map((item) => {
            return (
                {
                    productId: item.productId,
                    productName: item.productName,
                    description: item.description,
                    productImage: item.productImage,
                    qty: item.qty
                }
            )
        })
        const fileName = 'download_inventory_list'
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    }

    return (
        <>
            <div className='left' style={{ "marginTop": "8px" }}>
                <button style={{ "border": "none", "backgroundColor": "#FFF" }} onClick={onExportCsv}><FaFileCsv size={20} className='mx-1' /></button>
                <button style={{ "border": "none", "backgroundColor": "#FFF" }} onClick={() => { setViewType('List View') }}><FaList size={20} className='mx-1' /></button>
                <button style={{ "border": "none", "backgroundColor": "#FFF" }} onClick={() => { setViewType('Card View') }}><FaBuromobelexperte size={20} className='mx-1' /></button>
                <span> {viewType} </span>
            </div>
            <br></br>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100vh',
                }}
            >
                {!isLoading ?
                    viewType === 'List View' ?
                        (<>
                            <div className='container'>
                                <DataTable
                                    title='Product Inventory List'
                                    columns={columns}
                                    data={filteredItems}
                                    // data={productList}
                                    defaultSortFieldId={1}
                                    pagination
                                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                    onRowClicked={handleRowClicked}
                                    conditionalRowStyles={conditionalRowStyles}
                                    subHeader
                                    subHeaderComponent={subHeaderComponentMemo}
                                    persistTableHead
                                />
                            </div>
                        </>)
                        :
                        <>
                            <div className="container">
                                <div className='row'>
                                    <h4>Product Inventory List</h4>
                                    {
                                        productList.map((item, idx) => (
                                            <ProductCard item={item} key={idx} />
                                        ))
                                    }
                                </div>
                                <br></br>
                            </div>
                        </>
                    :
                    (<div className='box'><h1><FaSpinner className="icon_pulse" /></h1></div>)
                }
            </div>
            {!isLoading &&
                (<div className='left' style={{ "marginTop": "5px", "marginLeft": "5px" }}>
                    <p className="">1 - {productList.length} of {productList.length}</p>
                    <Button onClick={() => navigate('/product/create')}>Add</Button><br></br><br></br>
                </div>)
            }
        </>
    )
}

export default ProductList
