import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Shippers.css';
import ShipNav from '../ShipNav/ShipNav';

const Shippers = () => {
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const getAllShippers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/shippers');
        const shipperData = res.data.data || [];
        setShippers(Array.isArray(shipperData) ? shipperData : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching shippers:', error);
        setError('Failed to load couriers');
        toast.error('Failed to load couriers');
      } finally {
        setLoading(false);
      }
    };
    getAllShippers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this courier?')) {
      try {
        console.log('Attempting to delete shipper with ID:', id);
        const response = await axios.delete(`/shippers/${id}`);
        console.log('Delete response:', response);
        
        if (response.data && response.data.success) {
          setShippers(prevShippers => prevShippers.filter(shipper => shipper._id !== id));
          toast.success('Courier deleted successfully');
        } else {
          throw new Error(response.data?.message || 'Failed to delete courier');
        }
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.message || 'Failed to delete courier. Please try again.');
      }
    }
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4');
      
      // Add title
      doc.setFontSize(16);
      doc.text('Couriers Report', 14, 15);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      // Prepare table data
      const tableData = shippers.map(shipper => [
        shipper.providerid,
        shipper.companyname,
        shipper.companyaddress,
        shipper.companyemail,
        shipper.companyphone,
        shipper.companytype,
        shipper.rateperkg
      ]);

      // Add table
      doc.autoTable({
        head: [['Courier ID', 'Company Name', 'Company Address', 'Company Email', 
                'Contact Number', 'Company Type', 'Rate per kg ($)']],
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
      doc.save('couriers-report.pdf');
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate report');
    }
  };

  const columns = [
    { field: 'providerid', headerName: 'Courier ID', width: 150 },
    { field: 'companyname', headerName: 'Company Name', width: 200 },
    { field: 'companyaddress', headerName: 'Company Address', width: 200 },
    { field: 'companyemail', headerName: 'Company Email', width: 150 },
    { field: 'companyphone', headerName: 'Contact Number', width: 150 },
    { field: 'companytype', headerName: 'Company Type', width: 150 },
    { field: 'rateperkg', headerName: "Rate per kg ($)", width: 120 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <Link 
          to={`/shippers/${params.row._id}`}
          state={{ shipperData: params.row }}
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
    return <div className="sh-loading-message">Loading couriers...</div>;
  }

  if (error) {
    return <div className="sh-error-message">{error}</div>;
  }

  return (
    <div className="sh-shippers-container">
      <ShipNav />
      <div className="sh-shippers-header">
        <h1 className="sh-shippers-title">Couriers</h1>
        <div className="sh-shippers-actions">
          <Link to="/newshipper">
            <button className="sh-new-shippers-button">
              New Courier
            </button>
          </Link>
          <button className="sh-report-button" onClick={generatePDF}>
            Download Report
          </button>
        </div>
      </div>
      
      <div className="sh-shippers-grid">
        <DataGrid
          rows={shippers}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          error={error}
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
      </div>
    </div>
  );
};

export default Shippers;