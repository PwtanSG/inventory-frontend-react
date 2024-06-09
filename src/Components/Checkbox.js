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
            <label>
                {props.label}
                <input
                    type="checkbox"
                    name={props.name}
                    checked={props.checked}
                    className='form-check-input mx-2'
                    disabled={props.disabled}
                    onChange={onChangeHandler}
                />
            </label>
        </>
    )
}

export default Checkbox
