import { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import { ToastContainer } from 'react-bootstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const ToastComponent = (props) => {
    const [show, setShow] = useState(true)
    const toastType = props.type
    return (
        <>
            <ToastContainer
                // className="p-3"
                className="position-fixed"
                // position='top-end'
                position={props.position}
                style={{ zIndex: 1 }}
            >
                <Toast
                    color="success"
                    style={{
                        color: '#ffffff',
                        // position: 'absolute',
                        // top: 0,
                        // right: 0,
                        backgroundColor: props.type === 'error' ? '#ff0000' : '#5cb85c',
                    }}
                    show={show} onClose={() => setShow(false)} delay={3000} autohide
                >
                    <Toast.Body>
                        <span>
                            {toastType === 'error' ? <FaTimes /> : <FaCheck />}
                            &nbsp;{props.text}
                        </span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default ToastComponent
