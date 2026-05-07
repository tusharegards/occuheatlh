import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import PreEmployment from "./Pages/Services/PreEmployment";
import AnnualHealthScreening from "./Pages/Services/AnnualHealthScreening";
import DataWarehouse from "./Pages/Services/DataWarehouse";
import ContactUs from "./Pages/ContactUs";
import IndividualTestingVaccination from "./Pages/Services/IndividualTestingVaccination";
import ComplianceMonitoring from "./Pages/Services/compliance-monitoring";
import InServiceTraining from "./Pages/Services/InServiceTraining";
import LegalDocument from "./Pages/LegalDocument";

function App() {
  return (
    <Routes>
      <Route path="/terms" element={<LegalDocument variant="terms" />} />
      <Route path="/privacy" element={<LegalDocument variant="privacy" />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services/pre-employment" element={<PreEmployment />} />
        <Route path="/services/annual-health-screening" element={<AnnualHealthScreening />} />
        <Route path="/services/data-warehouse" element={<DataWarehouse />} />
        <Route path="/services/compliance-monitoring" element={<ComplianceMonitoring />} />
        <Route path="/services/in-service-training" element={<InServiceTraining />} />
        <Route path="/services/individual-testing-vaccination" element={<IndividualTestingVaccination />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
