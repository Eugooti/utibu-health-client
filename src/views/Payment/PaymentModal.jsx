import {Modal} from "antd";

// eslint-disable-next-line react/prop-types
const PaymentModal = ({open,confirmLoading,handleCancel,handleOk}) => {

    return(
        <>
            <Modal
                title="Payment Confirmation"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}

            >
                <p>Do you wish to complete payment now?</p>
            </Modal>
        </>
    )

}

export default PaymentModal;