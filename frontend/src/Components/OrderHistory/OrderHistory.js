import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { publicRequest } from '../../requestMethods';

function OrderHistory() {
    const [shipments, setShipments] = useState([]);
    const userEmail = 'user@example.com'; // Replace with authenticated user's email

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await publicRequest.get(`/shipments/user?email=${userEmail}`);
                setShipments(res.data.data);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };
        fetchShipments();
    }, []);

    const columns = [
        { field: 'itemid', headerName: 'Item ID', width: 100 },
        { field: 'itemname', headerName: 'Item Name', width: 150 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'track',
            headerName: 'Track',
            width: 100,
            renderCell: (params) => React.createElement(
                Link,
                { to: `/track/${params.row._id}` },
                React.createElement(
                    'button',
                    { className: 'bg-blue-500 text-white px-2 py-1 rounded' },
                    'Track'
                )
            )
        }
    ];

    return React.createElement(
        'div',
        { className: 'max-w-4xl mx-auto p-6' },
        React.createElement(
            'h1',
            { className: 'text-3xl font-bold mb-6' },
            'Order History'
        ),
        React.createElement(
            'div',
            { style: { height: 400, width: '100%' } },
            React.createElement(DataGrid, {
                rows: shipments,
                columns: columns,
                getRowId: (row) => row._id,
                initialState: {
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 }
                    }
                },
                pageSizeOptions: [10, 25, 50],
                disableRowSelectionOnClick: true
            })
        )
    );
}

export default OrderHistory;