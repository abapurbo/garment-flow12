# 👕 GarmentFlow 

GarmentFlow is a full-stack web application designed to help small and medium-sized garment factories efficiently manage orders, production stages, and delivery tracking. The system supports multiple user roles (Admin, Manager, Buyer) with secure authentication, role-based access control, and real-time order tracking.

---

## 🔗 Live Site
👉 [https://new-project-1786e.web.app/]

---

## 🎯 Project Purpose
The main goal of GarmentFlow is to simplify the garments production workflow by:
- Managing buyer orders
- Tracking production stages (Cutting, Sewing, Finishing,Packed, Delivery)
- Handling role-based dashboards for Admin, Manager, and Buyer
- Ensuring secure authentication and smooth user experience

---

## 👥 User Roles & Access
- **Admin**: Manage users, products, and all orders
- **Manager**: Add & manage products, approve orders, update tracking
- **Buyer**: Place orders, view order history, and track order status

---

## ✨ Key Features

### 🌐 General
- Modern responsive UI with dark/light theme toggle
- Dynamic page titles & 404 error page
- Framer Motion animations
- Toast & SweetAlert notifications
- Fully responsive for mobile, tablet & desktop

### 🔐 Authentication & Security
- Firebase Authentication (Email/Password & Google login)
- JWT token generated using **Firebase Admin SDK**
- Token stored securely in **HTTPS-only cookies**
- Protected private routes with role-based access
- Firebase & MongoDB credentials secured via **environment variables**

### 🏠 Home Page
- Eye-catching Hero Section with CTA
- Our Products (6 products from MongoDB)
- How It Works (step-by-step)
- Customer Feedback Carousel
- Our Achievements
- Our Partner Brands

### 📦 Products
- All Products page with grid layout
- Product Details page (Private Route)
- Order form with quantity & price validation
- Minimum Order Quantity (MOQ) enforcement

### 🛒 Orders
- Buyer can place and cancel pending orders
- Manager can approve/reject orders
- Admin can view all orders
- Order tracking timeline (Cutting → Delivery)

### 📊 Dashboard
- Role-based dashboards (Admin / Manager / Buyer)
- Search, filter & pagination
- Suspend system with feedback & reason
- Tracking timeline view for orders

---

## 🧩 Dashboard Features (Role-wise)

### 👑 Admin Dashboard
- Manage Users (Role update, Suspend with reason)
- Manage All Products
- View & filter All Orders
- Analytics dashboard (optional)

### 🧑‍💼 Manager Dashboard
- Add Product
- Manage Own Products
- Pending Orders Approval
- Add Production Tracking Updates
- Profile Management

### 🛍 Buyer Dashboard
- My Orders
- Track Order (timeline view)
- Profile & Suspend Feedback view

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Hook Form
- SweetAlert2 / React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Cookie Parser
- CORS

