import React from 'react'

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Scanner = () => {

    const barcodeFormatName = 'CODE_128';
    const mount = useRef(true);
    const [scanResult, setScanResult] = useState(null);
    const [message, setMessage] = useState(null);
    const [validUrl, setValidUrl] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        // const validateURL = (url) => {
        //     if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
        //         console.log('Valid');
        //         setValidUrl(true)
        //     } else {
        //         console.log('Not Valid');
        //     }
        // }

        const onScanSuccess = (decodedText, decodedResult) => {
            setMessage(decodedText);
            if (decodedResult.result.format.formatName === barcodeFormatName) {
                setTimeout(() => {
                    navigate('/product/' + decodedText)
                }, 500)
            }
            setMessage(`${decodedResult.result.format.formatName} detected. Only barcode accepted`);
        }

        const onScanFailure = (error) => {
            console.warn(`Code scan error = ${error}`);
            setMessage(`Code scan error = ${error}`);
        }

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5
        });


        if (mount.current) {
            scanner.render(onScanSuccess, onScanFailure);
        }

        return () => {
            mount.current = false;
        }
    }, []);


    return (
        <>
            <h3>Barcode Scanner</h3>
            {message && <span>{message}</span>}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <div className='main'>
                    <div id="reader"></div>
                </div>
                {scanResult
                    ? validUrl
                        ? <div><a href={scanResult}>{scanResult}</a></div>
                        : <div>{scanResult}</div>
                    : <div></div>
                }
            </div >
        </>
    );
}

export default Scanner;

