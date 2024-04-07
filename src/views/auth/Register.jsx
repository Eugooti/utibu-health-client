import {useForm} from "antd/es/form/Form.js";
import {Form, Input, message, Select} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import Header from "../../components/Header.jsx";
import axios from "axios";

const Register = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFormFinish = async (values) => {
        // todo handle form finish
        console.log(values)

        const {firstName,lastName,emailAddress,phoneNumber,gender,YOB,password}=values;
        try {

            const request=await axios.post('http://localhost:5000/uhs/patient/register',{firstName,lastName,emailAddress,phoneNumber,gender,YOB,password})

            if (request.status!==200){
                messageApi.error(request.data.error)
            }

            messageApi.success(request.data.message).then(()=>{
                window.location.href='/login'
            })

        }catch (e) {

            console.log(e.response.data);
            messageApi.error(e.response.data.errors)
        }


    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)

    };




    const rules={
        userEmail:[{required:true,message:"Required field"},{type:'email',message: "Enter a valid email"}],
        Fname:[{required:true,message:"Required field"}],
        Lname:[{required:true,message:"Required field"}],
        phone:[{required:true,message:"Required field"}],
        gender:[{required:true,message:"Required field"}],
        YOB:[{required:true,message:"Required field"}],
        Password:[{required:true,message:"Required field"}],
        passwordConfirm:[{required:true,message:"Required field"},({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
            },
        })],
    }


    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >
                <Header Title={"Create Account"} Subtitle={"Welcome to our Service."}/>

                <div className='grid md:grid-cols-2 md:gap-10'>
                    <Form.Item rules={rules.Fname} label="First Name" name="firstName">
                        <Input placeholder={'Jane'} size='large'/>
                    </Form.Item>

                    <Form.Item rules={rules.Lname} label="Last Name" name="lastName">
                        <Input placeholder={'Doe'} size='large'/>
                    </Form.Item>
                </div>
                <Form.Item rules={rules.userEmail} label="Email Address" name="emailAddress">
                    <Input placeholder={'test@test.com'} size='large'/>
                </Form.Item>

                <Form.Item rules={rules.phone} label="Phone Number" name="phoneNumber">
                    <Input placeholder={'0712345678'} size='large'/>
                </Form.Item>

                <div className='grid md:grid-cols-2 md:gap-10'>
                    <Form.Item rules={rules.gender} label="Gender" name={'gender'}>
                        <Select placeholder={'Male'} size='large'>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="male">Male</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item rules={rules.YOB} label="Year of Birth" name="YOB">
                        <Input placeholder={'2000'} size='large'/>
                    </Form.Item>
                </div>

                    <Form.Item rules={rules.Password} label="Password" name="password">
                        <Input.Password size='large'/>
                    </Form.Item>
                    <Form.Item rules={rules.passwordConfirm} label="Confirm Password" name="passwordConfirm">
                        <Input.Password  size='large'/>
                    </Form.Item>



                <div className="flex justify-center align-middle mt-12 mb-6">
                    <button
                        className='w-2/3 bg-amber-900 h-10 text-blue-50 rounded-2xl hover:bg-amber-950 text-lg'
                        type="submit">
                        <UserAddOutlined className={'pr-3'}/>

                        Sign up
                    </button>
                </div>

            </Form>
        </>
    )
}

export default Register