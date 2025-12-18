import React, { useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  // Dummy Users (replace with data later)
  const users = [
    { _id: 1, name: "Rahim Uddin", email: "rahim@example.com", role: "admin", status: "active" },
    { _id: 2, name: "Karim Mia", email: "karim@example.com", role: "manager", status: "pending" },
    { _id: 3, name: "Jamal Hossain", email: "jamal@example.com", role: "buyer", status: "suspended" },
  ];

  useQuery({
    queryKey: ["/all-users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?email=${user.email}`);
      return res.data;
    },
  });

  // Badge Styles
  const roleBadge = (role) => {
    switch (role) {
      case "admin":
        return "px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200";
      case "manager":
        return "px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200";
      case "buyer":
        return "px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      default:
        return "px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "active":
        return "px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "pending":
        return "px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "suspended":
        return "px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      default:
        return "";
    }
  };

  // Open Modal
  const handleUpdateModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setNewStatus(user.status);
    setFeedback("");
    modalRef.current.showModal();
  };

  // Submit Update
  const handleUpdateSubmit = () => {
    if (newStatus === "suspended" && !feedback) {
      alert("Suspend reason is required!");
      return;
    }

    const payload = {
      role: newRole,
      status: newStatus,
      suspendFeedback: newStatus === "suspended" ? feedback : "",
    };

    console.log("Update Payload:", payload);

    // axiosSecure.put(`/users/${selectedUser._id}`, payload)
    //   .then(() => refetch());

    modalRef.current.close();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-blue-500 dark:text-purple-400 mb-6">
        Manage Users
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td>{index + 1}</td>
                <td className="font-semibold">{u.name}</td>
                <td>{u.email}</td>
                <td><span className={roleBadge(u.role)}>{u.role}</span></td>
                <td><span className={statusBadge(u.status)}>{u.status}</span></td>
                <td className="text-center">
                  <button
                    onClick={() => handleUpdateModal(u)}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaUserEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-white dark:bg-gray-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-xl mb-4">Update User</h3>

          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p className="mb-3"><strong>Email:</strong> {selectedUser.email}</p>

              {/* Role */}
              <label className="font-semibold">Role</label>
              <select
                className="select select-bordered w-full mt-1"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>

              {/* Status */}
              <label className="font-semibold mt-4">Status</label>
              <select
                className="select select-bordered w-full mt-1"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>

              {/* Suspend Reason */}
              {newStatus === "suspended" && (
                <>
                  <label className="font-semibold mt-4 text-red-500">
                    Suspend Reason *
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full mt-1"
                    placeholder="Why are you suspending this user?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </>
              )}

              <button
                onClick={handleUpdateSubmit}
                className="btn btn-primary w-full mt-5"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
