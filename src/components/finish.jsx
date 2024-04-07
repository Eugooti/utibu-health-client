import { SmileOutlined } from '@ant-design/icons';
import {  Result } from 'antd';
import {useNavigate} from "react-router-dom";
const Successful =()=>{

    const navigate=useNavigate();


    return (
        <div className='flex items-center justify-center bg-amber-100 ' style={{minHeight:495 }}>
            <Result
                icon={<SmileOutlined/>}
                title="Great, your order has been recorded"
                extra={<button
                    onClick={()=>navigate('/')}
                    className='w-2/3 bg-amber-900 h-10 text-blue-50 rounded-2xl hover:bg-amber-950 text-lg'
                    type="primary">
                    Continue</button>}
            />
        </div>
    )
}
export default Successful;