import React from "react";
import { Route , Routes} from "react-router-dom";
import "./App.css";
import AboutUs from "./Components/AboutUs/AboutUs";
import ReportedItems from "./Components/ReportedItems/ReportedItems";
import DisplayItems from "./Components/DisplayItems/DisplayItems";
import ItemForm from "./Components/ItemForm/ItemForm";
import ItemsGallery from "./Components/ItemsGallery/ItemsGallery";
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
          <Route path="/rejected-items/:id" element={<RejectedItems />} />
          <Route path="/display-items" element={<DisplayItems/>}/>
          <Route path="/item-form/:id" element={<ItemForm />} />
          <Route path="/items-gallery" element={<ItemsGallery />} />
          <Route path="/flagged-items" element={<ReportedItems/>}/>
          <Route path="/flagged-items/:_id" element={<UpdateReport/>}/>
          <Route path="/add-report" element={<AddReport/>}/>
          <Route path="/items-gallery" element={<ItemsGallery/>}/>
        </Routes>
      </React.Fragment>

      <Footer></Footer>
    </div>
  );
}

export default App;