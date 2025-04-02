import React from "react";
import { Route , Routes} from "react-router-dom";
import "./App.css";
import AboutUs from "./Components/AboutUs/AboutUs";
import ReportedItems from "./Components/ReportedItems/ReportedItems";
import InspectionReport from "./Components/InspectionReport/InspectionReport";
import RejectedItems from "./Components/RejectedItems/RejectedItems";
import Home from "./Components/Home/Home";
import AddReport from "./Components/AddReport/AddReport";
import UpdateReport from "./Components/UpdateReport/UpdateReport";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/reject-items" element={<RejectedItems/>}/>
          <Route path="/flagged-items" element={<ReportedItems/>}/>
          <Route path="/flagged-items/:_id" element={<UpdateReport/>}/>
          <Route path="/add-report" element={<AddReport/>}/>
          <Route path="/inspection-report" element={<InspectionReport/>}/>
        </Routes>
      </React.Fragment>

      <Footer></Footer>
    </div>
  );
}

export default App;