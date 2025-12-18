import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaChartLine, FaSearch } from "react-icons/fa";

// Admin Dashboard - Tailwind + Recharts + Dark Mode
export default function Dashboard() {
  const stats = useMemo(
    () => ({
      totalUsers: 1245,
      totalProducts: 842,
      totalOrders: 3210,
      revenueThisMonth: 54320,
    }),
    []
  );

  const salesSeries = [
    { name: "01-12", sales: 1200 },
    { name: "02-12", sales: 2100 },
    { name: "03-12", sales: 800 },
    { name: "04-12", sales: 1600 },
    { name: "05-12", sales: 900 },
    { name: "06-12", sales: 2000 },
    { name: "07-12", sales: 2400 },
  ];

  const productBreakdown = [
    { name: "Shirts", value: 400 },
    { name: "Pants", value: 250 },
    { name: "Jackets", value: 120 },
    { name: "Accessories", value: 72 },
  ];

  const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#10B981"];

  const ordersDummy = Array.from({ length: 8 }).map((_, i) => ({
    id: `ORD-10${i + 1}`,
    user: ["John Doe", "Jane Smith", "Rony Das", "Maya Roy"][i % 4],
    product: ["Blue Shirt", "Denim Jeans", "Leather Jacket", "T-Shirt"][i % 4],
    quantity: Math.floor(Math.random() * 20) + 1,
    status: ["Pending", "Approved", "Shipped", "Delivered"][i % 4],
    date: `2025-12-${10 + i}`,
  }));

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-500 dark:text-purple-400">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Garments Order & Production Tracker — Overview
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                className="pl-10 pr-4 py-2 border rounded-lg w-72 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-purple-500"
                placeholder="Search products, orders or users..."
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
            <button className="btn bg-white border px-4 py-2 rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
              Export
            </button>
            <button className="btn bg-blue-600 text-white px-4 py-2 rounded-lg shadow dark:bg-purple-600 dark:hover:bg-purple-500">
              New
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} />
          <StatCard title="Products" value={stats.totalProducts} icon={<FaBoxOpen />} />
          <StatCard title="Orders" value={stats.totalOrders} icon={<FaShoppingCart />} />
          <StatCard
            title="Revenue (M)"
            value={`$${stats.revenueThisMonth.toLocaleString()}`}
            icon={<FaChartLine />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white dark:bg-gray-700 rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
              Sales (last 7 days)
            </h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={salesSeries}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    wrapperStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                    contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
              Product Breakdown
            </h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={productBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    label
                  >
                    {productBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    wrapperStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                    contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Recent Orders
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">{ordersDummy.length} recent</div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersDummy.map((o, idx) => (
                  <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td>{idx + 1}</td>
                    <td className="font-semibold">{o.id}</td>
                    <td>{o.user}</td>
                    <td>{o.product}</td>
                    <td>{o.quantity}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          o.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                            : o.status === "Approved"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                            : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------- Small reusable components ---------
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center text-2xl text-blue-600 dark:text-purple-400">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
      </div>
    </div>
  );
}
