import React from 'react';

const ManageUsers = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Users will be mapped here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
