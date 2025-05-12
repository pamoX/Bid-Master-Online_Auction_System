const React = require('react');
const { useState } = require('react');
const { useParams, useNavigate } = require('react-router-dom');
const { toast } = require('react-toastify');
const { publicRequest } = require('../../../requestMethods.js');

function SellerShippingForm() {
    const { auctionid } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemid: '',
        itemname: '',
        userName: '',
        email: '',
        phone: '',
        from: '',
        weight: '',
        shipmenttype: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.post('/shipments/pending', {
                auctionid,
                userType: 'seller',
                details: formData
            });
            toast.success('Shipping details submitted!');
            navigate('/orders');
        } catch (error) {
            toast.error('Failed to submit details');
        }
    };

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Seller Shipping Details'),
        React.createElement(
            'form',
            { onSubmit: handleSubmit, className: 'space-y-4' },
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Item ID'),
                React.createElement('input', {
                    type: 'text',
                    name: 'itemid',
                    value: formData.itemid,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Item Name'),
                React.createElement('input', {
                    type: 'text',
                    name: 'itemname',
                    value: formData.itemname,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Name'),
                React.createElement('input', {
                    type: 'text',
                    name: 'sellername',
                    value: formData.sellername,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Email'),
                React.createElement('input', {
                    type: 'email',
                    name: 'selleremail',
                    value: formData.selleremail,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Phone'),
                React.createElement('input', {
                    type: 'text',
                    name: 'sellerphone',
                    value: formData.sellerphone,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Pickup Address'),
                React.createElement('input', {
                    type: 'text',
                    name: 'from',
                    value: formData.from,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Weight (g)'),
                React.createElement('input', {
                    type: 'number',
                    name: 'weight',
                    value: formData.weight,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    min: '0',
                    step: '0.1',
                    required: true
                })
            ),
            /*
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Shipment Type'),
                React.createElement(
                    'select',
                    {
                        name: 'shipmenttype',
                        value: formData.shipmenttype,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    },
                    React.createElement('option', { value: '' }, 'Select Type'),
                    React.createElement('option', { value: 'Local' }, 'Local'),
                    React.createElement('option', { value: 'International' }, 'International')
                )
            ),
            */
            React.createElement(
                'button',
                { type: 'submit', className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' },
                'Submit'
            )
        )
    );
}

module.exports = SellerShippingForm;