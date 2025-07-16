# 📘 Project Title
Brief one-line description of what the project does.

---

## 🛠️ Tech Stack
List the technologies used (Node.js, Express, PostgreSQL, Sequelize, etc.)

---

## ⚙️ Setup Instructions
### 1. Clone the Repo
### 2. Install Dependencies
### 3. Configure Environment Variables (`.env`)
### 4. Run Migrations and Start Server

---

## 📁 Folder Structure
Tree view of the project’s directories and files.

---

## 🌐 API Endpoints

### 🔹 Events
| Method | Endpoint | Description |
|--------|----------|-------------|

### 🔹 Users
| Method | Endpoint | Description |

---

## 🧠 Business Rules / Validations
- Max event capacity = 1000
- No duplicate registrations
- No past event registration
- Error codes used: 400, 404, 409, etc.

---

## 🔄 Sample API Requests (Postman)
Example JSON bodies for:
- Creating Event
- Registering User
- Cancelling Registration

---

## 💻 Optional: Frontend UI
If you have a basic HTML form for testing → mention it here.

---

## 📦 Scripts (package.json)
List important NPM scripts like:
- `npm start`
- `npm run dev`
- `sequelize-cli` commands

---
# Example Requests & Responses
🔹 POST /api/events — Create Event
Request:

POST /api/events
Content-Type: application/json

{
  "title": "AI Hackathon",
  "dateTime": "2025-08-10T09:00:00.000Z",
  "location": "Mumbai",
  "capacity": 300
}

##Success Response:

Status: 201 Created

{
  "id": 1,
  "title": "AI Hackathon",
  "dateTime": "2025-08-10T09:00:00.000Z",
  "location": "Mumbai",
  "capacity": 300,
  "updatedAt": "2025-07-16T08:20:00.123Z",
  "createdAt": "2025-07-16T08:20:00.123Z"
}




