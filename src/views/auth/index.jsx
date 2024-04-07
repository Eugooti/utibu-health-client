import {Card, Tabs} from "antd";
import Header from "../../components/Header.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

const Authentication = () => {
    return (
        <>
            <div style={{minHeight:528}} className=' grid grid-cols-1 lg:gap-5 lg:grid-cols-2 items-center justify-items-center '>

                <div className='pr-12'>
                    <Header Title="Utibu Health Center" Subtitle='Prescription Renewal Service'/>
                </div>

                <div className="w-3/4 py-4">

                    <Card className='bg-amber-200'>
                        <Tabs centered>
                            <Tabs.TabPane tab="Sign In" key="1">
                                <Login/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Sign up" key="2">
                                <Register/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>


            </div>

        </>
    )
}


export default Authentication;