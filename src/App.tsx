import './App.css'
import Navbar from './Layouts/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import PreEmployment from './Pages/Services/PreEmployment';
import AnnualHealthScreening from './Pages/Services/AnnualHealthScreening';
import DataWarehouse from './Pages/Services/DataWarehouse';
import ContactUs from './Pages/ContactUs';
import IndividualTestingVaccination from './Pages/Services/IndividualTestingVaccination';
import Footer from './Layouts/Footer';

function App() {

  return (
    <>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/services/pre-employment" element={<PreEmployment />} />
         <Route path="/services/annual-health-screening" element={<AnnualHealthScreening />} />
         <Route path="/services/data-warehouse" element={<DataWarehouse/>} />
         <Route path="/services/individual-testing-vaccination" element={<IndividualTestingVaccination/>} />
         <Route path="/contact" element={<ContactUs/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
