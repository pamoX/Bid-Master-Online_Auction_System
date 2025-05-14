import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Shipments.css';
import ShipNav from '../ShipNav/ShipNav';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const getAllShipments = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get('/shipments');
        const shipmentData = res.data.data || [];
        setShipments(Array.isArray(shipmentData) ? shipmentData : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching shipments:', error);
        setError('Failed to load shipments');
        toast.error('Failed to load shipments');
      } finally {
        setLoading(false);
      }
    };
    const getAllShippers = async () => {
      try {
        const res = await publicRequest.get('/shippers');
        const shipperData = res.data.data || [];
        setShippers(Array.isArray(shipperData) ? shipperData : []);
      } catch (error) {
        console.error('Error fetching shippers:', error);
      }
    };
    getAllShipments();
    getAllShippers();
  }, []);

 

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        console.log('Attempting to delete shipment with ID:', id);
        const response = await publicRequest.delete(`/shipments/${id}`);
        console.log('Delete response:', response);
        
        if (response.data && response.data.success) {
          setShipments(prevShipments => prevShipments.filter(shipment => shipment._id !== id));
          toast.success('Shipment deleted successfully');
        } else {
          throw new Error(response.data?.message || 'Failed to delete shipment');
        }
    } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.message || 'Failed to delete shipment. Please try again.');
      }
    }
  };

  const handleAssignCourier = async (shipmentId, courierId, field) => {
    try {
      const selectedCourier = shippers.find(shipper => shipper.providerid === courierId);
      const currentShipment = shipments.find(shipment => shipment._id === shipmentId);
      
      if (!selectedCourier || !currentShipment) {
        throw new Error('Courier or shipment not found');
      }

      const calculatedCost = currentShipment.weight * selectedCourier.rateperkg;

      await publicRequest.post('/shipments/assign-courier', { 
        shipmentId, 
        courierid: courierId,
      });

      setShipments(
        shipments.map((shipment) =>
          shipment._id === shipmentId
            ? { 
                ...shipment, 
                [field]: courierId, 
                cost: field === 'courieridToCollection' 
                  ? calculatedCost 
                  : shipment.cost + calculatedCost,
                status: field === 'courieridToCollection' 
                  ? 'Courier Assigned to Collection' 
                  : 'Courier Assigned to Buyer' 
              }
            : shipment
        )
      );
      toast.success('Courier assigned successfully');
    } catch (error) {
      console.error('Error assigning courier:', error);
      toast.error('Failed to assign courier');
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4');
      
      // Add title
      doc.setFontSize(16);
      doc.text('Shipments Report', 14, 15);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      // Prepare table data
      const tableData = shipments.map(shipment => [
        shipment.itemid,
        shipment.itemname,
        shipment.from,
        shipment.collectionCenter,
        shipment.to,
        shipment.userName,
        shipment.selleremail,
        shipment.phone,
        shipment.buyername,
        shipment.buyeremail,
        shipment.buyerphone,
        shipment.weight,
        shipment.shipmenttype,
        shipment.cost,
        shipment.status
      ]);

      // Add table
      doc.autoTable({
        head: [['Item ID', 'Item Name', 'From', 'Collection Center', 'To', 'Seller Name', 
                'Seller Email', 'Seller Phone', 'Buyer Name', 'Buyer Email', 'Buyer Phone', 
                'Weight', 'Type', 'Cost', 'Status']],
        body: tableData,
        startY: 30,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [61, 75, 100],
          textColor: 255,
          fontSize: 8,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 30 },
      });

      // Save the PDF
      doc.save('shipments-report.pdf');
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate report');
    }
  };

  const columns = [
    { field: 'itemid', headerName: 'Item ID', width: 150 },
    { field: 'itemname', headerName: 'Item Name', width: 200 },
    { field: 'from', headerName: 'From', width: 200 },
    { field: 'collectionCenter', headerName: 'Collection Center', width: 200 },
    { field: 'to', headerName: 'To', width: 200 },
    { field: 'userName', headerName: 'Seller Name', width: 150 },
    { field: 'selleremail', headerName: 'Seller Email', width: 200 },
    { field: 'phone', headerName: 'Seller Phone', width: 150 },
    { field: 'buyername', headerName: 'Buyer Name', width: 150 },
    { field: 'buyeremail', headerName: 'Buyer Email', width: 200 },
    { field: 'buyerphone', headerName: 'Buyer Phone', width: 150 },
    { field: 'weight', headerName: 'Weight (kg)', width: 120 },
    { field: 'shipmenttype', headerName: 'Type', width: 120 },
    { field: 'cost', headerName: 'Cost ($)', width: 120 },
    {
      field: 'courieridToCollection',
      headerName: 'Courier to Collection',
      width: 180,
      renderCell: (params) => (
        <select
          value={params.row.courieridToCollection || ''}
          onChange={(e) => handleAssignCourier(params.row._id, e.target.value, 'courieridToCollection')}
          disabled={params.row.status !== 'Pending'}
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
      width: 180,
      renderCell: (params) => (
        <select
          value={params.row.courieridToBuyer || ''}
          onChange={(e) => handleAssignCourier(params.row._id, e.target.value, 'courieridToBuyer')}
          disabled={params.row.status !== 'At Collection Center'}
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
      width: 150,
      renderCell: (params) => (
        <Link 
          to={`/shipments/${params.row._id}`}
          state={{ shipmentData: params.row }}
        >
          <button className="edit-button">Edit</button>
        </Link>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <FaTrash
            className="delete-icon"
            onClick={() => handleDelete(params.row._id)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="sh-loading-message">Loading shipments...</div>;
  }

  if (error) {
    return <div className="sh-error-message">{error}</div>;
  }

  return (
    <div className="sh-shipments-container">
      <ShipNav />
      <div className="sh-shipments-header">
        <h1 className="sh-shipments-title">Shipments</h1>
        <div className="sh-shipments-actions">
        <Link to="/newshipment">
            <button className="sh-new-shipments-button">
              New Shipment
            </button>
        </Link>
          <button className="sh-report-button" onClick={generatePDF}>
            Download Report
          </button>
        </div>
      </div>
      
      <div className="sh-shipments-grid">
        {shipments.length === 0 ? (
          <div className="sh-no-data-message">No shipments found</div>
        ) : (
        <DataGrid
          rows={shipments}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                lineHeight: 'normal',
                padding: '8px',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
            }}
        />
        )}
      </div>
    </div>
  );
}

export default Shipments;