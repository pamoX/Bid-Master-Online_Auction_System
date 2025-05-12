import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers } from "react-icons/fa";

function ShipNav() {
  return (
    <div className="sh-sidenav">
      <ul className="sh-sidenav-nav">
        <Link to="/shipmanagedash">
          <li className="sh-sidenav-nav-item">
            <FaHome className="sh-sidenav-icon" />
            <span>Shipping Dashboard</span>
          </li>
        </Link>
        <div className="sh-sidenav-divider"></div>
        <Link to="/shipments">
          <li className="sh-sidenav-nav-item">
            <FaBox className="sh-sidenav-icon" />
            <span>Shipments</span>
          </li>
        </Link>
        <Link to="/shippers">
          <li className="sh-sidenav-nav-item">
            <FaUsers className="sh-sidenav-icon" />
            <span>Shipping Providers</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default ShipNav;

/*import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers } from "react-icons/fa";
import './ShipNav.css';

function ShipNav() {
  return (
    <div className="sidenav">
      <ul className="sidenav-nav">
        <Link to="/shipmanagedash">
          <li className="sidenav-nav-item">
            <FaHome className="sidenav-icon" />
            <span>Shipping Dashboard</span>
          </li>
        </Link>
        <div className="sidenav-divider"></div>
        <Link to="/shipments">
          <li className="sidenav-nav-item">
            <FaBox className="sidenav-icon" />
            <span>Shipments</span>
          </li>
        </Link>
        <Link to="/shippers">
          <li className="sidenav-nav-item">
            <FaUsers className="sidenav-icon" />
            <span>Shipping Providers</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default ShipNav;*/

/* import React from 'react'
import {
    FaHome,
    FaUsers,
    FaUser,
    FaBox,
    FaClipboardList,
    FaElementor,
    FaCog,
    FaHdd,
    FaChartBar,
    FaClipboard,
    FaCalendarAlt,
  } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import "./ShipNav.css";

function ShipNav() {
  return (
    <div class="sidebar">
  <ul class="sidebar-nav">
    <a href="/">
      <li class="sidebar-nav-item">
        <i class="sidebar-icon fa fa-home"></i>
        Shipping Dashboard
      </li>
    </a>
    <li class="sidebar-nav-item">
      <i class="sidebar-icon fa fa-user"></i>
      Profile
    </li>
    
    <div class="sidebar-divider"></div>
    
    <a href="/shipments">
      <li class="sidebar-nav-item">
        <i class="sidebar-icon fa fa-box"></i>
        Shipments
      </li>
    </a>
    <a href="/shippers">
      <li class="sidebar-nav-item">
        <i class="sidebar-icon fa fa-users"></i>
        Shipping Service Providers
      </li>
    </a>
  </ul>
</div>
  )
}

export default ShipNav

   */