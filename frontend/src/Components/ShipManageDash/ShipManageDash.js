import React from 'react';
import { Link } from 'react-router-dom';

function ShipManageDash() {
    return React.createElement(
        'div',
        { className: 'max-w-4xl mx-auto p-6' },
        React.createElement(
            'h1',
            { className: 'text-3xl font-bold mb-6' },
            'Admin Dashboard'
        ),
        React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
            React.createElement(
                'div',
                { className: 'bg-white p-6 rounded-lg shadow-md' },
                React.createElement(
                    'h2',
                    { className: 'text-xl font-semibold mb-4' },
                    'Manage Shipments'
                ),
                React.createElement(
                    'p',
                    { className: 'mb-4' },
                    'Track and organize your shipments efficiently.'
                ),
                React.createElement(
                    Link,
                    { to: '/shipments' },
                    React.createElement(
                        'button',
                        { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' },
                        'Go to Shipments'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'bg-white p-6 rounded-lg shadow-md' },
                React.createElement(
                    'h2',
                    { className: 'text-xl font-semibold mb-4' },
                    'Manage Couriers'
                ),
                React.createElement(
                    'p',
                    { className: 'mb-4' },
                    'Handle shipping service providers with ease.'
                ),
                React.createElement(
                    Link,
                    { to: '/shippers' },
                    React.createElement(
                        'button',
                        { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' },
                        'Go to Couriers'
                    )
                )
            ),

             React.createElement(
                'div',
                { className: 'bg-white p-6 rounded-lg shadow-md' },
                React.createElement(
                    'h2',
                    { className: 'text-xl font-semibold mb-4' },
                    'Manage Profile'
                ),
    
                React.createElement(
                    Link,
                    { to: '/shipprofile' },
                    React.createElement(
                        'button',
                        { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' },
                        'Profile'
                    )
                )
            )
        )
    );
}

export default ShipManageDash;

/*import React from 'react'
import { Link } from 'react-router-dom'
import './ShipManageDash.css'

function ShipManageDash() {
  return (
    <div  className='shipdash'>
      
    <div class="sh-dashboard-container">
        <div class="sh-card">
            <div class="sh-card-image shipment-image"></div>
            <div class="sh-card-content">
                <h2 class="sh-card-title">Manage Shipments</h2>
                <p class="sh-card-description">Track and organize your shipments efficiently</p>
                <Link to="/shipments" className="sh-link">
                    <a href="#" class="sh-card-button">Go to Shipments</a></Link>
            </div>
        </div>
        <div class="sh-card">
            <div class="sh-card-image provider-image"></div>
            <div class="sh-card-content">
                <h2 class="sh-card-title">Manage Providers</h2>
                <p class="sh-card-description">Handle shipping service providers with ease</p>
                <Link to="/shippers" className="sh-link">
                    <a href="#" class="sh-card-button">Go to Providers</a></Link>
                    
                
            </div>
        </div>
    </div>

    </div>
  )
}

export default ShipManageDash
*/