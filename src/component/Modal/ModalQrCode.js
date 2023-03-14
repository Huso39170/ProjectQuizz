import React from 'react'
import QRCode from 'qrcode.react';

const ModalQrCode = ({modal,toggleModal,qrCodeValue}) => {
    return (
        <>
        {modal  &&(
            <div className="modal">
                <div onClick={()=> {toggleModal()}} className="overlay"></div>
                <div className="modal-content">
                    <h2 className='modal-title'>Qr code</h2>
                    <button className="close-modal" onClick={()=> {toggleModal()}}>
                        X
                    </button>
                    <div >
                        <QRCode value={qrCodeValue} size={256} />
                    </div>

                </div>
            </div>
        )}
    </>
    )
}

export default ModalQrCode