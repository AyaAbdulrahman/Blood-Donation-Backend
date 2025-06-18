
# Blood Donation Management System – Backend

This is the backend of the **Blood Donation Management System**, built using **Node.js**, **Express.js**, and **PostgreSQL**. It serves as the RESTful API layer for managing users, centers, blood donation requests, appointments, and campaigns.

---

## 📦 Project Structure

```
BloodDonationBackend/
│
├── db.js                    # PostgreSQL database connection
├── index.js                 # Entry point for Express server
├── routes/
│   ├── appointments.js      # Appointment endpoints
│   ├── campaigns.js         # Campaign management
│   ├── centers.js           # Blood center routes
│   ├── donors.js            # Donor CRUD and authentication
│   ├── posts.js             # Center post routes
│   └── requests.js          # Blood request endpoints
├── package.json             # Node dependencies and scripts
└── .env                     # Environment variables (e.g., DB credentials)
```

---

## ⚙️ Setup & Installation


### 1. Install Dependencies

```bash
npm install
```

### 2. Setup PostgreSQL Database

- Create a PostgreSQL database (e.g., `blood_donation`).
- Update `.env` with your DB credentials:

```
DATABASE_URL=postgresql://user:password@localhost:5432/blood_donation
PORT=5000
```

### 3. Run the Server

```bash
node index.js
```

Server runs at: `http://localhost:5000`

---

## 🚀 API Endpoints

### 🔐 Donors

- `POST /api/donors`: Register new donor
- `GET /api/donors/:id`: Get donor by user ID
- `PUT /api/donors/:id`: Update donor profile

### 🏥 Centers

- `GET /api/centers`: Get all centers
- `GET /api/centers/:id`: Get center by ID

### 🩸 Requests

- `POST /api/requests`: Add new blood request
- `GET /api/requests`: Get all active requests

### 📅 Appointments

- `POST /api/appointments`: Book an appointment
- `GET /api/appointments/user/:user_id`: Get appointments by user
- `GET /api/appointments/center/:center_id`: Get appointments by center

### 📢 Campaigns

- `POST /api/campaigns`: Add campaign
- `GET /api/campaigns`: List campaigns

### 📝 Posts

- `POST /api/posts`: Add center post
- `GET /api/posts`: Get posts

---

## 📌 Features

- Donor profile management
- Appointment booking by centers or donors
- Urgent and available blood requests
- Campaign and post creation for awareness
- RESTful API with structured endpoints

---

## 🔐 Security & Environment

- All sensitive data is stored in `.env`
- Basic input validation handled in endpoints

---

