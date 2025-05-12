import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { publicRequest } from '../../requestMethods';
import './Shipments.css';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    const getAllShipments = async () => {
      try {
        const res = await publicRequest.get('/shipments');
        setShipments(res.data.data);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };
    const getAllShippers = async () => {
      try {
        const res = await publicRequest.get('/shippers');
        setShippers(res.data.data);
      } catch (error) {
        console.error('Error fetching shippers:', error);
      }
    };
    getAllShipments();
    getAllShippers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/shipments/${id}`);
      setShipments(shipments.filter((shipment) => shipment._id !== id));
    } catch (error) {
      console.error('Error deleting shipment:', error);
    }
  };

  const handleAssignCourier = async (shipmentId, courierId, field) => {
    try {
      await publicRequest.post('/shipments/assign-courier', { shipmentId, courierid: courierId });
      setShipments(
        shipments.map((shipment) =>
          shipment._id === shipmentId
            ? { ...shipment, [field]: courierId, status: field === 'courieridToCollection' ? 'Courier Assigned to Collection' : 'Courier Assigned to Buyer' }
            : shipment
        )
      );
    } catch (error) {
      console.error('Error assigning courier:', error);
    }
  };

  const columns = [
    { field: 'itemid', headerName: 'Item ID', width: 100 },
    { field: 'itemname', headerName: 'Item Name', width: 150 },
    { field: 'from', headerName: 'From', width: 100 },
    { field: 'collectionCenter', headerName: 'Collection Center', width: 150 },
    { field: 'to', headerName: 'To', width: 100 },
    { field: 'userName', headerName: 'Seller', width: 120 },
    { field: 'selleremail', headerName: 'Seller Email', width: 150 },
    { field: 'buyername', headerName: 'Buyer', width: 120 },
    { field: 'buyeremail', headerName: 'Buyer Email', width: 150 },
    { field: 'weight', headerName: 'Weight', width: 80 },
    { field: 'shipmenttype', headerName: 'Shipment Type', width: 120 },
    { field: 'cost', headerName: 'Cost', width: 80 },
    {
      field: 'courieridToCollection',
      headerName: 'Courier to Collection',
      width: 150,
      renderCell: (params) => (
        <select
          value={params.row.courieridToCollection || ''}
          onChange={(e) => handleAssignCourier(params.row._id, e.target.value, 'courieridToCollection')}
        >
          <option value="">Select Courier</option>
          {shippers.map((shipper) => (
            <option key={shipper._id} value={shipper.providerid}>
              {shipper.companyname}
            </option>
          ))}
        </select>
      )
    },
    {
      field: 'courieridToBuyer',
      headerName: 'Courier to Buyer',
      width: 150,
      renderCell: (params) => (
        <select
          value={params.row.courieridToBuyer || ''}
          onChange={(e) => handleAssignCourier(params.row._id, e.target.value, 'courieridToBuyer')}
        >
          <option value="">Select Courier</option>
          {shippers.map((shipper) => (
            <option key={shipper._id} value={shipper.providerid}>
              {shipper.companyname}
            </option>
          ))}
        </select>
      )
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Link to={`/shipments/${params.row._id}`}>
          <button className="edit-button">Edit</button>
        </Link>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 75,
      renderCell: (params) => (
        <FaTrash className="delete-icon" onClick={() => handleDelete(params.row._id)} />
      )
    }
  ];

  return (
    <div className="sh-shipment-container">
      <div className="sh-header-container">
        <h1 className="sh-shipment-title">All Shipments</h1>
        <Link to="/newshipment">
          <button className="sh-new-shipment-button">New Shipment</button>
        </Link>
      </div>
      <div className="sh-shipments-grid">
        <DataGrid
          rows={shipments}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } }
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

export default Shipments;


/* worked in mid
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { publicRequest } from '../../requestMethods';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Shipments.css';
const URL = "http://localhost:5000/shipments"; // Base URL for API requests
function Shipments() {
    const [shipments, setShipments] = useState([]); // variable name casing
    

    const navigate = useNavigate(); // useNavigate hook for navigation

    const columns = [
        { field: "itemid", headerName: "Item ID", width: 100 },
        { field: "itemname", headerName: "Item Name", width: 150 },
        {field: "from", headerName: "From", width: 100 },
        { field: "to", headerName: "To", width: 100 },
        { field: "userName", headerName: "Seller", width: 120 },
        { field: "email", headerName: "Seller Email", width: 120 },
        { field: "phone", headerName: "Seller Contact", width: 100 },
        { field: "weight", headerName: "Weight", width: 80 },
        { field: "shipmenttype", headerName: "Shipment Type", width: 120 },
        { field: "cost", headerName: "Cost", width: 80 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'courierid', headerName: 'Courier ID', width: 100 },
        
        {
            field: "edit",
            headerName: "Edit",
            width: 150,
            renderCell: (params) => (
                <Link to={`/shipments/${params.row._id}`}>
                    <button className="edit-button">Edit</button>
                </Link>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 75,
            renderCell: (params) => (
              <button>
                 <FaTrash 
                    className="delete-icon" 
                    onClick={() => handleDelete(params.row._id)}
                   //onClick={handleDelete}
                />
              </button>
               
            ),
        },
    ];

    useEffect(() => {
        const getAllShipments = async () => {
            try {
                const res = await publicRequest.get("/shipments");
                setShipments(res.data.shipments || res.data); // Handle possible response structure
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };
        getAllShipments();
    }, []);

     const handleDelete = async (id) => {
            try {
                await publicRequest.delete(`/shipments/${id}`);
                setShipments(shipments.filter(shipments => shipments._id !== id)); // Update state instead of reloading
            } catch (error) {
                console.error('Error deleting shipment:', error);
            }
        };
    /*const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`)
            .then(res => res.data)
            .then(() => navigate("/"))
            .then(()=> navigate("/shipments"))
            setShipments(shipments.filter(shipment => shipment._id !== id));
        } catch (error) {
            console.error("Error deleting shipment:", error);
        }
    };//comment out

    return (
        <div className="sh-shipment-container">
            <div className="sh-header-container">
                <h1 className="sh-shipment-title">All Shipments</h1>
                <Link to="/newshipment">
                    <button className="sh-new-shipment-button">New Shipment</button>
                </Link>
            </div>
            <div className="ssh-hipments-grid">
            <DataGrid 
                rows={shipments} 
                columns={columns} 
                getRowId={(row) => row._id}
               
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 }
                    }
                }}
                pageSizeOptions= {[10, 25, 50]}
                checkboxSelection
                disableSelectionOnClick
            />
            </div>
        </div>
    );
}

export default Shipments;
*/