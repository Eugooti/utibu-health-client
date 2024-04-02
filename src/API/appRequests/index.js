import axios from "axios";
import {useEffect, useState} from "react";
import {getFromLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";


const useGetOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = getFromLocalStorage('User');

                if (!user || !user.emailAddress) {
                    console.error('User email address not found');
                    return;
                }

                const response = await axios.get(`http://localhost:5000/uhs/order/readByUser/${user.emailAddress}`);

                if (response.status !== 200) {
                    console.error('Error fetching orders');
                    return;
                }

                setOrders(response.data.result);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    return orders;
};



const useGetMedicine =  () => {

    const [medicine,setMedicine]=useState()

    useEffect(() => {
        const fetchData=async()=>{
            try {

                const response=await axios.get('http://localhost:5000/uhs/medicine/readAll')

                if (response.status!==200){
                    console.error("Error fetching categories")
                }

                const orders=await response;

                setMedicine(orders.data?.result)

            }catch (e) {
                console.log(e)
            }

        }

        fetchData()

    }, []);

    return medicine;

}




const useUpdateOrder = async ({data,id}) => {

    const [message,setMessage]=useState(null);

    try {
        const response=await axios.put(`http://localhost:5500/${id}`,{data})

        const Data=await response.message;

        setMessage(Data)

    }catch (e) {
        console.log(e)
    }
    return message
}

export {useGetMedicine,useGetOrder}


