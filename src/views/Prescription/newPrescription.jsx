import {Card, Form, message, Select} from "antd";
import {useForm} from "antd/es/form/Form.js";
import Header from "../../components/Header/Header.jsx";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGetMedicine} from "../../API/appRequests/index.js";
import Example from "../../components/Header/modal.jsx";
import {getFromLocalStorage, setLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";
import axios from "axios";


const weightRanges=[
    {start:2,end:15},
    {start:16,end:25},
    {start:26,end:35},
    {start:35,end:55},
    {start:55,end:70},
    {start:71,end:200},
]


const rules={
    medicine:[{required:true,message:"Required field"}],
    weight:[{required:true,message:"Required field"}],
}

const NewPrescription = () => {
    const [form] = useForm();

    const Medicine=useGetMedicine()





    const navigate=useNavigate();




    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };



   

    const [about, setAbout] = useState();
    
    

    const [messageApi, contextHolder] = message.useMessage();


    const [user,setUser]=useState()


    useEffect(() => {
        setUser(getFromLocalStorage('User'))
    }, []);


    const onFormFinish = (values) => {
        // todo handle form finish
        console.log(values)
        for (let i in Medicine){
            if (Medicine[i].medicine===values.medicine){
                setAbout(Medicine[i])
            }
        }

        if (about?.miniWeight>values.weight){
            messageApi.error("minimum weight needed is "+about.miniWeight+"Kg")
        }else {
            showModal()
        }
        
    };

    const handleNo =  async () => {

        try {
            const {medicine,doseCost}=about


            const response=await axios.post('http://localhost:5000/uhs/order/create',{
                customerEmail:user?.emailAddress,
                medicine,
                cost:doseCost,
                paymentStatus:false,
                collectionStatus:false
            })

            if (response.status===200){
                setOpen(false)
                navigate('/successful')
            }

            else {
                setOpen(false)
            }

        }catch (e) {
            console.log(e)
        }


    }


    const handleYes = () => {
        const {medicine,doseCost}=about
        const data={
            customerEmail:user?.emailAddress,
            medicine,
            cost:doseCost,
            paymentStatus:true,
            collectionStatus:false
        }

        setLocalStorage('Paid',data)
        navigate('/payment')


        setOpen(false)
    }


    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo);
    };



    return (
        <div className='flex items-center justify-center'>
            {contextHolder}
            <div className="w-1/2 py-4" >
                <Card className='bg-amber-300'>
                    <Header Title={"Order Your Prescription"} Subtitle={"Have a healthy life"}/>

                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >


                        <Form.Item >

                            <Form.Item rules={rules.medicine} className='w-full' label="Medicine" name='medicine'>
                                <Select className='h-10'>
                                    {Medicine?.map((item,index)=>(
                                        // eslint-disable-next-line react/jsx-key
                                        <Select.Option key={index} value={item.medicine}>{item.medicine+" for "+item.disease}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item rules={rules.weight} label="Weight Range" name='weight'>
                                <Select size='large'>
                                    {weightRanges.map((item,index)=>(
                                        // eslint-disable-next-line react/jsx-key
                                        <Select.Option key={index} value={item.end}>{item.start+"Kg"+" - "+item.end+"Kg"}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>


                            <div className="flex justify-center pt-10 align-middle">
                                <button className='w-2/3 bg-amber-900 h-10 text-blue-50 rounded-2xl hover:bg-amber-950 text-lg' type="submit" >
                                    <ShoppingCartOutlined className={'pr-3'}/>
                                    Make Order
                                </button>
                            </div>

                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <Example handleYes={handleYes} handleNo={handleNo} open={open} setOpen={setOpen} about={about}/>
        </div>
)
}


export default NewPrescription;