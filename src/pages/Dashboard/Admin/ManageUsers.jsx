import React, { useRef, useState } from "react";
import { FaUserEdit, FaBan } from "react-icons/fa";

const ManageUsers = () => {
  const modalRef = useRef();
  const [selectedUser, setSelectedUser] = useState(null);

  // Dummy User Data (replace with API)
  const users = [
    {
      _id: 1,
      name: "Rahim Uddin",
      email: "rahim@example.com",
      role: "admin",
      status: "active",
    },
    {
      _id: 2,
      name: "Karim Mia",
      email: "karim@example.com",
      role: "manager",
      status: "active",
    },
    {
      _id: 3,
      name: "Jamal Hossain",
      email: "jamal@example.com",
      role: "buyer",
      status: "suspended",
    },
  ];

  // Open Modal & Set User
  const handleRoleUpdateModal = (user) => {
    setSelectedUser(user);
    modalRef.current.showModal();
  };

  // Badge Colors for Roles
  const roleBadge = (role) => {
    switch (role) {
      case "admin":
        return "badge badge-primary";
      case "manager":
        return "badge badge-accent";
      case "buyer":
        return "badge badge-info";
      default:
        return "badge";
    }
  };

  // Status Badge Color
  const statusBadge = (status) => {
    return status === "active"
      ? "badge badge-success"
      : "badge badge-error";
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">Manage Users</h2>

      <div className="overflow-x-auto rounded-xs  border border-base-content/10 bg-base-100 hover:shadow-2xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>

                {/* Name */}
                <td className="font-semibold">{user.name}</td>

                {/* Email */}
                <td>{user.email}</td>

                {/* Role */}
                <td>
                  <span className={roleBadge(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className={statusBadge(user.status)}>
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-4 justify-center">
                  {/* Update Role */}
                  <div
                    onClick={() => handleRoleUpdateModal(user)}
                    className="tooltip"
                    data-tip="Update Role"
                  >
                    <button className="btn btn-sm btn-circle btn-info text-white">
                      <FaUserEdit size={16} />
                    </button>
                  </div>

                  {/* Suspend / Activate */}
                  <div
                    className="tooltip"
                    data-tip={
                      user.status === "active"
                        ? "Suspend User"
                        : "Activate User"
                    }
                  >
                    <button
                      className={`btn btn-sm btn-circle text-white ${
                        user.status === "active"
                          ? "btn-error"
                          : "btn-success"
                      }`}
                    >
                      <FaBan size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Role Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl mb-4">Update User Role</h3>

          {selectedUser && (
            <>
              <p className="font-semibold mb-2">
                Name: {selectedUser.name}
              </p>
              <p className="mb-4">Email: {selectedUser.email}</p>

              <label className="font-semibold">Select New Role</label>
              <select className="select select-bordered w-full mt-2">
                <option>admin</option>
                <option>manager</option>
                <option>buyer</option>
              </select>

              <button className="btn btn-primary w-full mt-4">
                Update Role
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
