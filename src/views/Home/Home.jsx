import Image1 from '../../assets/Images/Image01.jpg'
import Image2 from '../../assets/Images/Image02.jpg'
import Image5 from '../../assets/Images/Image05.jpg'
import {Image} from "antd";
import {UserContext} from "../../Context/User Context/UserContext.jsx";

const Home = () => {

    console.log(UserContext);

    return (
        <>
            <div className='grid grid-cols-1 gap-8'>

                <div className='grid grid-cols-1 '>
                    <div className='flex justify-center align-middle'>
                        <h1 className='text-2xl font-bold m-5'>About Utibu Health Center</h1>
                    </div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2  md:gap-14 '>
                        <div style={{display:"flex", alignItems:"center", justifyItems:"center"}}>

                            <p className='text-center text-lg font-sans pl-10'>At Utibu Health Center, we're
                                dedicated to providing innovative solutions that
                                streamline healthcare services and prioritize patient well-being. Our online platform
                                revolutionizes the way patients
                                access their prescriptions,
                                offering convenience and peace of mind in managing their healthcare needs remotely.</p>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyItems:"end"}} className='pr-10 pl-10'>
                            <Image
                                src={Image1}
                            />
                        </div>



                    </div>

                </div>

                <div className='grid grid-cols-1'>
                    <div className='flex justify-center align-middle'>
                        <h1 className='text-2xl font-bold m-5'>Our Mission</h1>
                    </div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2  md:gap-4 pr-10 pl-8'>
                        <div style={{display: "flex", alignItems: "center", justifyItems: "end"}}>

                            <Image
                                src={Image5}
                            />
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyItems: "center"}} className='pr-8'>
                        <p className='text-center text-lg font-sans'>Empowering patients with the tools they need to take control of their
                                health is at the heart of our mission. We strive to enhance accessibility to essential medications by leveraging technology,
                                ensuring that patients can easily order and manage their prescriptions from the comfort of their homes.</p>
                        </div>



                    </div>

                </div>

                <div className='grid grid-cols-1 mb-10'>
                    <div className='flex justify-center align-middle'>
                        <h1 className='text-2xl font-bold m-5'>How It Works</h1>
                    </div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2  md:gap-14 '>
                        <div style={{display:"flex", alignItems:"center", justifyItems:"center"}} className=' flex-col'>

                            <p className='text-justify text-lg font-sans pl-10 pt-10 pr-10'>
                                Our intuitive online system simplifies the prescription ordering process, enabling patients to:
                            </p>
                            <ul className='pr-10 pl-10 pt-5 font-normal grid gap-3 text-justify font-sans'>
                                <li>
                                   <b>• Order Prescriptions Remotely:</b>  Through our secure platform, patients can conveniently submit their prescription orders online without
                                    the need for physical visits to the hospital or pharmacy.
                                </li>
                                <li>
                                   <b>• Access Prescription History:</b>  Patients have instant access to their prescription history, facilitating better medication
                                    management and continuity of care.
                                </li>
                                <li>
                                   <b>• Receive Timely Updates:</b>  Our system keeps patients informed every step of the way, providing real-time updates on the status of their
                                    prescription orders and estimated delivery times.
                                </li>
                                <li></li>
                            </ul>
                            <div style={{width:'100%'}} className='pl-10 flex-col'>
                                <h1 className='font-bold text-xl'>Advantages of Our System</h1>
                                <ul className='text-lg'>
                                    <li>
                                        • Convenience.
                                    </li>
                                    <li>
                                        • Safety.
                                    </li>
                                    <li>
                                        • Efficiency.
                                    </li>
                                </ul>

                            </div>



                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyItems:"center"}} className='pr-10 pl-10'>

                        <Image
                            src={Image2}
                        />
                        </div>
                    </div>

                </div>



            </div>
        </>
    )
}

export default Home;