# Finance Data Processing and Access Control Dashboard

A robust backend REST API built with Node.js, Express, and MongoDB, implementing JWT authentication, RBAC (Role-Based Access Control), and complex data aggregations.

## Features Built
- **Authentication**: JWT-based login and registration.
- **RBAC**: Three roles (`admin`, `analyst`, `viewer`) with strict permission boundaries.
- **Financial Records**: Full CRUD for transactions with soft deletes.
- **Dashboard Summary**: Complex aggregation pipelines calculating net balance, monthly trends, and category summaries.
- **Validations**: Strict Joi-based request validation.
- **Security**: Basic rate limiting, CORS setup, Helmet HTTP headers.

## Getting Started

1. **Install Dependencies** (Already done automatically):
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Ensure `.env` is configured correctly (it has already been generated with defaults).

3. **Seed the Database**:
   Populate the dashboard with initial data (users and transactions).
   ```bash
   node seed.js
   ```

4. **Run the Server**:
   ```bash
   node server.js
   ```

5. **Test the API**:
   You can view the interactive API documentation at:
   `http://localhost:5000/api-docs`

## Seed User Accounts
- **Admin**: `admin@finance.com` / `password123`
- **Analyst**: `analyst@finance.com` / `password123`
- **Viewer**: `viewer@finance.com` / `password123`

## Assumptions Made
1. Application assumes a locally running MongoDB instance at `mongodb://localhost:27017`.
2. Module system chosen is CommonJS to align with current Express community standards and existing package.json.
3. Added robust error handling globally, meaning unexpected crashes should bubble up to JSON responses.
4. Soft deletes hide records from `$find` queries effectively acting as real deletes for clients.

## API Endpoints List

### Auth (`/api/v1/auth`)
- `POST /register`: Create a new user account
- `POST /login`: Get standard JWT tokens for access

### Users (`/api/v1/users`)
- `GET /`: List all users (**Admin**)
- `PATCH /:id`: Update user roles and status (**Admin**)

### Transactions (`/api/v1/transactions`)
- `GET /`: Get all with pagination, search, and date filters (**Admin**, **Analyst**)
- `POST /`: Create transaction (**Admin**)
- `GET /:id`: Get specific transaction (**Admin**, **Analyst**)
- `PATCH /:id`: Update fields (**Admin**)
- `DELETE /:id`: Soft delete record (**Admin**)

### Dashboard (`/api/v1/dashboard`)
- `GET /summary`: Totals, net balance, trends (**Viewer**, **Analyst**, **Admin**)
