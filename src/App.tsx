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
import ComplianceMonitoring from './Pages/Services/compliance-monitoring';


function App() {

  return (
    <>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Services/pre-employment" element={<PreEmployment />} />
         <Route path="/Services/annual-health-screening" element={<AnnualHealthScreening />} />
         <Route path="/Services/data-warehouse" element={<DataWarehouse/>} />
         <Route path="/Services/compliance-monitoring" element={<ComplianceMonitoring/>} />
         <Route path="/Services/individual-testing-vaccination" element={<IndividualTestingVaccination/>} />
         <Route path="/Contact" element={<ContactUs/>} />
      </Routes>
      <Footer/>
     
    </>
  )
}

export default App
