import {Table} from "antd";
import {useGetOrder} from "../../API/appRequests/index.js";
import {ExampleLoaderComponent} from "../../dev/palette.jsx";

const PrescriptionHistory = () => {



    const orders=useGetOrder();



    const data=orders.map((obj,index)=>{
        return {
            key:index+1,
            medicine:obj.medicine,
            paymentStatus:obj.paymentStatus?"Yes":"No",
            collectionStatus:obj.collectionStatus?"Yes":"No",
            cost:"Ksh. "+obj.cost
        }
    })

    console.log(data)

    return(
        <>
            {!orders?<>

                    <ExampleLoaderComponent/>
                </>:

                <div className={'py-10 pl-10 pr-10'}>
                    <Table
                        columns={[
                            {
                                title:"Number",
                                dataIndex:'key',
                                key:"key",
                                render: (text) => <a>{text}</a>,
                            },

                            {
                                title: "Medicine",
                                dataIndex: "medicine",
                                key: "medicine",
                                render: (text) => <a>{text}</a>,
                            },
                            {
                                title: "Payment Status",
                                dataIndex: "paymentStatus",
                                key: "paymentStatus",
                                responsive: ["md"],
                                render:(text)=><a>{text}</a>
                            },
                            {
                                title: "Collection Status",
                                dataIndex: "collectionStatus",
                                key: "collectionStatus",
                                responsive: ["lg"],
                                render:(text)=><a>{text}</a>
                            },
                            {
                                title: "Cost",
                                dataIndex: "cost",
                                key: "cost",
                                responsive: ["lg"],
                            },
                        ]}
                        dataSource={data}
                    />
                </div>


            }
        </>
    )
}
export default PrescriptionHistory