import React from 'react'
import QRCode from 'qrcode.react';
import './ModalQrCode.css'
import './ModalPreviewQuestion.css'
import { ImCross } from 'react-icons/im';
import { FiCopy } from 'react-icons/fi'

const ModalQrCode = (props) => {

    function copyClick() {
        const codeToCopy = document.querySelector('.adm__code').innerText;
        navigator.clipboard.writeText(codeToCopy)
          .then(() => {
            console.log('Code copied to clipboard');
          })
          .catch((err) => {
            console.error('Error copying code: ', err);
          });
    }

    return (
        <>
        {props.modal  &&(
            <div className="modal__qr">
                <ImCross className='cross_modal_preview' role='button' onClick={()=>{props.toggleModal()}}/>
                <div className='modal__codes'>
                    <p className='__code' onClick={copyClick}>{props.code}<FiCopy/></p>
                    <div><QRCode className='qr_code' value={props.qrCodeValue} size={256} /></div>
                </div>
            </div>
        )}
    </>
    )
}

export default ModalQrCode