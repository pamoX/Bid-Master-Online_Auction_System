import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');

function ShipmentTracking() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await publicRequest.get(`/shipments/${id}`);
        setShipment(res.data.data);
      } catch (error) {
        console.error('Error fetching shipment:', error);
      }
    };
    fetchShipment();

    socket.on('shipmentUpdate', (data) => {
      if (data.itemid === shipment?.itemid) {
        setShipment((prev) => ({ ...prev, status: data.status }));
        toast.info(`Shipment ${data.itemid}: ${data.status}`);
      }
    });

    return () => socket.off('shipmentUpdate');
  }, [id, shipment?.itemid]);

  if (!shipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Track Shipment: {shipment.itemid}</h2>
      <p><strong>Item:</strong> {shipment.itemname}</p>
      <p><strong>From:</strong> {shipment.from}</p>
      <p><strong>Collection Center:</strong> {shipment.collectionCenter}</p>
      <p><strong>To:</strong> {shipment.to}</p>
      <p><strong>Seller:</strong> {shipment.userName} ({shipment.selleremail})</p>
      <p><strong>Buyer:</strong> {shipment.buyername} ({shipment.buyeremail})</p>
      <p><strong>Weight:</strong> {shipment.weight} g</p>
      <p><strong>Shipment Type:</strong> {shipment.shipmenttype}</p>
      <p><strong>Cost:</strong> ${shipment.cost}</p>
      <p><strong>Courier to Collection Center:</strong> {shipment.courieridToCollection || 'Not assigned'}</p>
      <p><strong>Courier to Buyer:</strong> {shipment.courieridToBuyer || 'Not assigned'}</p>
      <p><strong>Status:</strong> {shipment.status}</p>
    </div>
  );
}

export default ShipmentTracking;

/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');

function ShipmentTracking() {
    const { id } = useParams();
    const [shipment, setShipment] = useState(null);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const res = await publicRequest.get(`/shipments/${id}`);
                setShipment(res.data.data);
            } catch (error) {
                console.error('Error fetching shipment:', error);
            }
        };
        fetchShipment();

        socket.on('shipmentUpdate', (data) => {
            if (data.itemid === shipment?.itemid) {
                setShipment((prev) => ({ ...prev, status: data.status }));
                toast.info(`Shipment ${data.itemid}: ${data.status}`);
            }
        });

        return () => socket.off('shipmentUpdate');
    }, [id, shipment?.itemid]);

    if (!shipment) {
        return React.createElement(
            'div',
            null,
            'Loading...'
        );
    }

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement(
            'h2',
            { className: 'text-2xl font-bold mb-6' },
            `Track Shipment: ${shipment.itemid}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'Item:'),
            ` ${shipment.itemname}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'From:'),
            ` ${shipment.from}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'To:'),
            ` ${shipment.to}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'Status:'),
            ` ${shipment.status}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'Cost:'),
            ` $${shipment.cost}`
        ),
        React.createElement(
            'p',
            null,
            React.createElement('strong', null, 'Courier ID:'),
            ` ${shipment.courierid || 'Not assigned'}`
        )
    );
}

export default ShipmentTracking;
*/