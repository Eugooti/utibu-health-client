import NewPrescription from "./Prescription/newPrescription.jsx";
import Home from './Home/Home.jsx'
import PaymentConfirmation from "./Payment/PaymentConfirmation.jsx";
import {Route, Routes} from "react-router-dom";
import Successful from "../components/finish.jsx";
import History from "./prescriptionHistory/prescriptionHistory.jsx";
import Authentication from "./auth/index.jsx";

const Pages = () => {
  return(
      < >
          <div className='bg-amber-100'>
              <Routes>
                  <Route exact path={'/login'} element={<Authentication/>}/>
                  <Route exact path={'/'} element={<Home/>}/>
                  <Route exact path={'/order'} element={<NewPrescription/>}/>
                  <Route exact path={'/payment'} element={<PaymentConfirmation/>}/>
                  <Route exact path={'/successful'} element={<Successful/>}/>
                  <Route exact path={'/history'} element={<History/>}/>
              </Routes>
          </div>

      </>
  )
}

export default Pages;