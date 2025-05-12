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
    };*/

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
