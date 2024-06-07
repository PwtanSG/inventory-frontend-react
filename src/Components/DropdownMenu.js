import axios from "axios"
import { useEffect, useState } from "react"

// usage 
// const [selected, setSelected] = useState('')
// e.g <DropdownMenu endpoint="categories" selected={selected} setSelected={setSelected} />

const DropdownMenu = ({ endpoint, selected, setSelected }) => {

    const initList = [
        { name: 'Select', id: '' }
    ]
    const [list, setList] = useState(initList)
    const API_URL = process.env.REACT_APP_BACKEND_BASE_DOMAIN

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios({
                    'method': 'get',
                    'url': `${API_URL}${endpoint}`
                })
                // console.log(response)
                setList([...initList, ...response.data.items])
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [API_URL])

    const handleChange = (e) => {
        setSelected(e.target.value)
    }
    return (

        <div className='col-xs-12 col-sm-6 col-lg-4 col-xl-3'>
            <select className="form-select mb-2" value={selected} onChange={handleChange} >
                {
                    list.map((item, idx) =>
                    (
                        <option key={idx} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            {/* <p>selected{selected}</p> */}
        </div>

    )
}

export default DropdownMenu
