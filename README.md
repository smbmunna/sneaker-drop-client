# Sneaker Merch Drop System

This project is a simplified **Merch Drop System** where users can reserve limited-stock items for a short time window before completing a purchase.

### Live Links
**[ Client Github Link](https://github.com/smbmunna/sneaker-drop-client)** ||
**[ Client Live Link](https://sneaker-drop-client.vercel.app/)**

**[ Server Github Link](https://sneaker-drop-server.vercel.app/)** ||
**[ Server Live Link](https://github.com/smbmunna/sneaker-drop-server)**

## Tech Stack

### Frontend
- React
- Axios
- Firebase
- TanStack Query
- React Hook Form
- TailwindCSS + DaisyUI

### Backend
- Node.js
- Express
- PostgreSQL (NeonDB)

---

## How to Run the App
This project can fully run on the production environment as both the frontend and the backend is fully deployed on production environment. 

## How to Run the App Locally


### 1 Clone the Repository (Frontend)

```bash
git clone <repository-url>
cd sneaker-drop-client
npm install

```
###  Clone the Repository (Backend)
```bash
git clone <repository-url>
cd sneaker-drop-server
npm install
```

### Environment variables (.env) (Backend)
```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>
PORT=5000
```

### PostgreSQL Schema Setup
Run the following SQL in your PostgreSQL database:
```bash
-- Items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  item_code VARCHAR(50) UNIQUE NOT NULL,
  item_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Drops table
CREATE TABLE drops (
  id SERIAL PRIMARY KEY,
  item_code VARCHAR(50) REFERENCES items(item_code),
  total_stock INT NOT NULL,
  available_stock INT NOT NULL,
  starts_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reservations table
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  item_code VARCHAR(50),
  expires_at TIMESTAMP NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE
);

-- User table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT
);

```

### Start backend server
```bash
node index.js
```
### Backend runs at:
```bash
http://localhost:5000
```
### Start Frontend server
```bash
npm run dev
```


### Architecture Choice
### How is the 60-second expiration handled? 

Instead of WebSockets, this project uses a database-driven vercel CRON job technique.

User clicks Reserve

Backend:
* Decrements available stock

* Creates a reservation with expires_at = NOW() + 60 seconds

* Stock is temporarily held for the user

### Expiration Handling

Each reservation includes an expires_at timestamp

A cleanup process using vercel cron job:
Restores stock for expired reservations
Deletes expired, incomplete reservations

### Concurrency Handling
* Concurrency is handled at the database level using atomic updates and transactions.
* All reserve logic runs inside a transaction:
``` bash
BEGIN;
-- stock update
-- reservation insert
COMMIT;

````