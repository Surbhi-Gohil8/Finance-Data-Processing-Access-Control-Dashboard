# Finance Data Processing & Access Control Dashboard

A robust, full-featured backend REST API designed for processing financial records, managing users, and enforcing strict Role-Based Access Control (RBAC). Built entirely on Node.js, Express.js, and MongoDB, this system adheres to clean architecture principles and provides comprehensive endpoints for both analytical dashboard summaries and granular transaction management.

---

## 🚀 Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODMs)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing
- **Input Validation:** Joi
- **Logging:** Morgan & Winston
- **Security:** Helmet, express-rate-limit, cors
- **Documentation:** Swagger UI (yamljs)

---

## ✨ Core Features

1. **User & Role Management**
   - Secure registration and login workflows issuing JWT access tokens.
   - Distinct roles (`viewer`, `analyst`, `admin`) restricting endpoint access.
   - Admin tools for updating existing user roles or deactivating accounts.

2. **Advanced Financial Record CRUD**
   - Keep track of `income` and `expense` transactions.
   - Built-in pagination and sorting for large data sets.
   - Advanced dynamic `$find` filtering by date range, category, type, and search keywords.
   - Soft-delete strategy to preserve historical data integrity natively in Mongoose models.

3. **Complex Dashboard Aggregations**
   - Calculates real-time total income, total expenses, and net balance using server DB load instead of API parsing via `$aggregate` pipelines.
   - Generates category-wise cost breakdowns.
   - Plots chronologically sorted monthly income and expense trends.

4. **Robust Security & Validation**
   - Global JSON error handlers ensure the APIs never unexpectedly crash.
   - Detailed `joi` validations for ensuring correctly formatted dates, enum strings, and numeric minimums logic.
   - Protected against multi-spam via IP rate-limiting, and general XSS via Helmet headers.

---

## 📂 Project Structure

```text
/config         # Database connection and Logger configurations
/controllers    # Endpoint handlers processing requests and constructing responses
/middlewares    # JWT verification, Role authorization, Joi schema validaton, Error handling
/models         # Mongoose schemas (User, Transaction)
/routes         # Express router groupings mapped to specific controllers
/services       # Core business logic containing DB queries and aggregations
/utils          # Helper functions (ApiError, catchAsync wrappers)
/validations    # Joi schema definitions for incoming requests
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Surbhi-Gohil8/Finance-Data-Processing-Access-Control-Dashboard.git
cd Finance-Data-Processing-Access-Control-Dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Ensure a `.env` file exists in the root directory. This project requires the following keys:
```env
PORT=5000
MONGODB_URI=URL 
JWT_SECRET=supersecretjwtkey_please_change_in_production
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### 4. Database Seeding (Optional but recommended)
You can quickly populate your database with dummy users and transactions to test the endpoints.
```bash
node seed.js
```
*This generates 3 users (Admin, Analyst, Viewer) and 5 sample transactions.*

### 5. Start the Server
**Development Mode:**
```bash
npm run dev # (If you install nodemon)
# OR
node server.js
```
You should see: `[INFO]: MongoDB Connected: localhost` & `[INFO]: Server running in development mode on port 5000`

---

## 📚 API Overview & Authentication

All protected routes require a JWT token to be sent in the header:
`Authorization: Bearer <your_token_here>`

### Access Control Rules:
- **Viewer:** Can only read the Dashboard Summary.
- **Analyst:** Can read the Dashboard Summary and query Transactions.
- **Admin:** Can create, read, update, and soft-delete transactions. Can modify user roles.

---

### Endpoint Reference

You can interactively test the endpoints using the built-in Swagger interface.
Navigate your browser to: `http://localhost:5000/api-docs`

#### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account | None |
| `POST` | `/login` | Authenticate and get JWT token | None |

#### Users (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List all users | **Admin** |
| `PATCH` | `/:id` | Update user roles and status | **Admin** |

#### Transactions (`/api/v1/transactions`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all with pagination, search, & date filters | **Admin**, **Analyst** |
| `POST` | `/` | Create transaction | **Admin** |
| `GET` | `/:id` | Get specific transaction | **Admin**, **Analyst** |
| `PATCH` | `/:id` | Update transaction fields | **Admin** |
| `DELETE` | `/:id` | Soft delete transaction record | **Admin** |

#### Dashboard (`/api/v1/dashboard`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/summary` | Retrieve totals, net balance, and trends | **Admin**, **Analyst**, **Viewer** |

---

## 👤 Default Seeded Accounts
If you ran `node seed.js`, the following accounts are ready to use via the `/auth/login` endpoint right now:

- **Admin Account**: Email: `admin@finance.com` | Password: `password123`
- **Analyst Account**: Email: `analyst@finance.com` | Password: `password123`
- **Viewer Account**: Email: `viewer@finance.com` | Password: `password123`
