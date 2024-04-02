import {FloatButton, Layout, theme} from 'antd';
import NavBar from './Header/Navbar.jsx'
import {PlusCircleOutlined} from "@ant-design/icons";
import Pages from "../views/index.jsx";
import {getFromLocalStorage} from "../Utils/LocalStorage/localStorage.jsx";
import {useNavigate} from "react-router-dom";

const {  Content, Footer } = Layout;



const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const User=getFromLocalStorage("User")

    const navigate=useNavigate()

    const newPrescription = () => {
        navigate('/order')
    }

    return (
        <Layout>

            <NavBar/>
            <Content
                style={{
                    padding: '10 48px',
                }}
            >

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 500,
                        borderRadius: borderRadiusLG,
                    }}

                >
                    <Pages/>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
               This is Utibu Prescription Ordering System
            </Footer>

            {User&&<FloatButton className={'bg-amber-600'} onClick={newPrescription} icon={<PlusCircleOutlined/>} tooltip={<div>New Prescription</div>} />}


        </Layout>
    );
};
export default App;