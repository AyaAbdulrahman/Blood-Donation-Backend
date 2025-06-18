# Blood Donation Management System - Center Dashboard

This component (`CenterMain.jsx`) is part of the Blood Donation Management System. It serves as the main dashboard for a blood donation center, allowing staff to manage posts, campaigns, and user appointment requests.

## 📌 Features

- Displays Center Info: Fetches and displays the name of the center dynamically.
- Post & Campaign Management: Buttons to add and view posts or campaigns.
- User Management: Option to accept or reject donors.
- Appointment Analytics: Visualizes appointment statuses in a responsive line chart using Recharts.

## 🧩 Technologies Used

- React.js
- Recharts (LineChart)
- REST API (Fetch)
- CSS for styling
- Bootstrap (optional)

## 📊 Appointment Status Chart

The chart displays the number of appointments per status (e.g., pending, approved, rejected) using a line graph.

Example Chart Data Structure:
[
  { status: "pending", count: 5 },
  { status: "approved", count: 3 },
  { status: "rejected", count: 2 }
]

Chart Components Used:
- LineChart
- Line
- CartesianGrid
- XAxis
- YAxis
- Tooltip
- ResponsiveContainer

## 🔧 How It Works

1. Fetch Center Info:
Uses `fetch("http://localhost:5000/api/centers/6")` to retrieve the donation center’s information using its ID.

2. Fetch User Appointments:
Uses `fetch("http://localhost:5000/api/appointments/user/5")` to retrieve appointments for a hardcoded user ID (can be modified for dynamic integration).

3. Generate Chart Data:
Appointments are grouped by their `status` and transformed into a format suitable for Recharts.

## 🧪 Sample Environment

Ensure the backend (e.g., Node.js + PostgreSQL) is running and exposing the following endpoints:
- GET /api/centers/:center_id
- GET /api/appointments/user/:user_id

## ✅ To Do

- Integrate dynamic user authentication (replace hardcoded user ID).
- Connect the Add and View buttons to actual post/campaign management pages.
- Expand dashboard to support filtering, search, and live status updates.

## 📁 File Location

The `CenterMain.jsx` file is located in your React frontend under:
`/src/components/CenterMain.jsx`

## 🖼️ UI Preview

Dashboard Layout:
- Header with center name and logout
- Cards for Posts, Campaigns, User Approval
- Appointment status chart (line chart)

## 💬 Feedback

Feel free to fork this repo or open issues to suggest features or report bugs.
