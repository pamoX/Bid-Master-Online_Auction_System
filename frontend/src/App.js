import React from "react";
import { Route , Routes} from "react-router-dom";
import "./App.css";
import AboutUs from "./Components/AboutUs/AboutUs";
import ReportedItems from "./Components/ReportedItems/ReportedItems";
import ItemForm from "./Components/ItemForm/ItemForm";
import ItemsGallery from "./Components/ItemsGallery/ItemsGallery";
import Home from "./Components/Home/Home";
import AddReport from "./Components/AddReport/AddReport";
import UpdateReport from "./Components/UpdateReport/UpdateReport";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";
import ItemManager from "./Components/ItemManager/ItemManager";
import EditItem from "./Components/ItemForm/EditItem";
import ItemView from "./Components/ItemView/ItemView";  

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/item-form" element={<ItemForm />} />
          <Route path="/item-manager" element={<ItemManager/>} />
          <Route path="/item/:id" element={<ItemView />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
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