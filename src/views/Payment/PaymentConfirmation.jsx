import {Card, Form, Input, message, Modal} from "antd";
import Header from "../../components/Header/Header.jsx";
import {useForm} from "antd/es/form/Form.js";
import {MobileOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromLocalStorage, removeItem} from "../../Utils/LocalStorage/localStorage.jsx";
import axios from "axios";

const PaymentConfirmation = () => {
    const [form] = useForm();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you wish to make payment right now?');
    const showModal = () => {
        setOpen(true);
    };


    const [orderData, setOrderData] = useState();
    useEffect(() => {
        const orderDetails=getFromLocalStorage('Paid')
        setModalText('You will be charged a total of Ksh.'+orderDetails?.cost+' for purchasing '+orderDetails?.medicine);
        setOrderData(orderDetails)

    }, []);


    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(async () => {
                try {
                    const response=await axios.post('http://localhost:5000/uhs/order/create',(orderData))

                    if (response.status===200){
                        setOpen(false)
                        messageApi.success("Order recorded Successfully").then(()=>{
                            navigate('/successful')
                            removeItem('Paid')
                        })
                    }

                    else {
                        messageApi.error('Unable to record order at the moment')
                    }

                }catch (e) {
                    messageApi.error(e.message)
                }

            
            setOpen(false);
            setConfirmLoading(false);
            navigate('/payment')
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const navigate=useNavigate();

    const onFormFinish = (values) => {
        // todo handle form finish
        console.log(values);
        showModal()
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo);
    };

    const rules={
        phone:[{required:true,message:"Required Field"},
            {pattern:/^(?:254|\+254|0)?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$/ ,message:"Enter a Safaricom Number"}

        ]
    }


    return(
        <>
            {contextHolder}
            <Modal
                title="Payment Onfirmation"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}

            >
                <p>{modalText}</p>
            </Modal>
            <div className='flex items-center justify-center'>
                <Card className='sm:w-3/4 lg:w-1/2 bg-amber-300 mt-10'>
                    <Header Title={"Complete Payment"} Subtitle='Enter Phone number for the Transaction'/>
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >



                        <Form.Item rules={rules.phone} className='w-full' label="Phone Number" name="phone">
                            <Input
                                prefix={<MobileOutlined/>}
                                className='h-10'/>
                        </Form.Item>
                        <div className="flex justify-center align-middle">
                            <button
                                className='w-2/3 bg-amber-900 h-10 text-blue-50 rounded-2xl hover:bg-amber-950 text-lg'
                                type="submit">
                                Continue
                            </button>
                        </div>
                    </Form>

                </Card>
            </div>

        </>

    )

}
export default PaymentConfirmation;