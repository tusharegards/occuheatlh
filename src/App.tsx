import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import PreEmployment from "./Pages/Services/PreEmployment";
import AnnualHealthScreening from "./Pages/Services/AnnualHealthScreening";
import DataWarehouse from "./Pages/Services/DataWarehouse";
import ContactUs from "./Pages/ContactUs";
import IndividualTestingVaccination from "./Pages/Services/IndividualTestingVaccination";
import ComplianceMonitoring from "./Pages/Services/compliance-monitoring";
import LegalDocument from "./Pages/LegalDocument";

function App() {
  return (
    <Routes>
      <Route path="/terms" element={<LegalDocument variant="terms" />} />
      <Route path="/privacy" element={<LegalDocument variant="privacy" />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Services/pre-employment" element={<PreEmployment />} />
        <Route path="/Services/annual-health-screening" element={<AnnualHealthScreening />} />
        <Route path="/Services/data-warehouse" element={<DataWarehouse />} />
        <Route path="/Services/compliance-monitoring" element={<ComplianceMonitoring />} />
        <Route path="/Services/individual-testing-vaccination" element={<IndividualTestingVaccination />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
