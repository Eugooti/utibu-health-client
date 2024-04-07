import  { useState } from 'react';
import { Button, Modal } from 'antd';
import {useNavigate} from "react-router-dom";

const Modals = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you wish to make payment right now?');
    const showModal = () => {
        setOpen(true);
    };

    const navigate=useNavigate();

    const handleOk = () => {
        setModalText('Do you wish to make payment right now?');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            navigate('/payment')
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        navigate('/successful')
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Payment Onfirmation"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}

            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};
export default Modals;