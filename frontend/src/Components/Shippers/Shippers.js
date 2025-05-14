import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Shippers.css';
import ShipNav from '../ShipNav/ShipNav';

const Shippers = () => {
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const getAllShippers = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get('/shippers');
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
        const response = await publicRequest.delete(`/shippers/${id}`);
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

  const columns = [
    { field: 'providerid', headerName: 'Courier ID', width: 150 },
    { field: 'companyname', headerName: 'Company Name', width: 200 },
    { field: 'companyaddress', headerName: 'Address', width: 250 },
    { field: 'companyemail', headerName: 'Email', width: 200 },
    { field: 'companyphone', headerName: 'Phone', width: 150 },
    { field: 'companytype', headerName: 'Type', width: 120 },
    { field: 'rateperkg', headerName: 'Rate per kg ($)', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
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
      width: 100,
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

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('couriers-report.pdf');
      toast.success('Report downloaded successfully');
    }).catch(error => {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate report');
    });
  };

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
          <button 
            type="button"
            className="sh-report-button" 
            onClick={generatePDF}
          >
            Download Report
          </button>
        </div>
      </div>
      
      <div className="sh-shippers-grid" ref={pdfRef}>
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