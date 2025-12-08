import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300">
          <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
            ☰
          </label>
          <div className="flex-1 px-2 mx-2">Dashboard</div>
        </div>
        <div className="flex-grow p-8">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><a href="/dashboard/profile">Profile</a></li>
          <li><a href="/dashboard/admin">Admin Panel</a></li>
          <li><a href="/dashboard/manager">Manager Panel</a></li>
          <li><a href="/dashboard/user">My Orders</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
