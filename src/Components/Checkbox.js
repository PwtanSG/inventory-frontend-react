const Checkbox = (props) => {

    const onChangeHandler = (e) => {
        props.setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: !props.checked
        })
        )
    }

    return (
        <>
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                className='form-check-input'
                disabled={props.disabled}
                onChange={onChangeHandler}
            />
        </>
    )
}

export default Checkbox
