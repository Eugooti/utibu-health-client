import {Card, Form, Input, message} from "antd";
import Header from "../../components/Header/Header.jsx";
import {useForm} from "antd/es/form/Form.js";
import { LoginOutlined, UnlockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {setLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [form] = useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        }).then(() => window.location.href='/');
    };
    const Error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        }).then(() => console.log("opened"));
    };



    const rules={
        username:[{required:true,message:"Required field"},{type:'email',message: "Enter a valid email"}],
        password:[{required:true,message:"Required field"}],
    }

    const navigate=useNavigate()

    const onFormFinish =async (values) => {



        console.log(values)

        try {
            const response = await axios.post('http://localhost:5000/uhs/patient/login', { username:values.username, password:values.password });

            if (response.data.message === "Login successful") {

                console.log(response)
                setLocalStorage("User", response.data.user); // Log user information
                success(response.data?.message)
                setLocalStorage('authToken', response.data.authToken)
                navigate('/')
            }

        }catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error here
                console.log(error.response.data);
                Error(error.response.data.message)
            } else {
                // Handle other errors here
                Error(error.message)
            }
        }
        // todo handle form finish
    };


    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo);
    };


    return (
        <>
            {contextHolder}
            <div className=' grid grid-cols-1 lg:gap-5 lg:grid-cols-2 items-center justify-items-center '>

                <div className='pr-12'>
                    <Header Title="Utibu Health Center" Subtitle='Prescription Renewal Service'/>
                </div>

                <div className="w-3/4 py-4">

                <Card className='bg-amber-300 mt-10'>
                    <Header Title={"Sign In"} Subtitle={"Welcome Back"}/>
                    <Form
                        form={form}
                        name="login"
                        layout="vertical"
                        initialValues={{remember: true}}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >



                        <Form.Item rules={rules.username} label="Username" name="username">
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="test@test.com" size='large'/>
                        </Form.Item>
                        <Form.Item rules={rules.password} label="Password" name="password">
                            <Input.Password
                                prefix={<UnlockOutlined/>}
                                size='large'/>
                        </Form.Item>

                        <div className="flex justify-center align-middle mt-12 mb-6">
                            <button
                                className='w-2/3 bg-amber-900 h-10 text-blue-50 rounded-2xl hover:bg-amber-950 text-lg'
                                type="submit">
                                <LoginOutlined className={'pr-3'}/>
                                Log In
                            </button>
                        </div>
                    </Form>


                </Card>

                </div>
            </div>
        </>
    )
}

export default Login