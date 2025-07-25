# Inventory Management System Backend

## Submission Summary

- **GitHub Repository:** [https://github.com/Abdul121104/fi-assesment](https://github.com/Abdul121104/fi-assesment)
- **API Documentation:**
  - Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
  - OpenAPI Spec: `swagger-output.json`
- **Frontend Setup:** See `/frontend/README.md` for full instructions.

---

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB database (Atlas or local)

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Abdul121104/fi-assesment
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure MongoDB connection:
   - Edit `models/db.js` and set your MongoDB URI in `mongoURI`.(currently i have added my mongodb atlas uri so you can run the test one type as for running it again you need to delete the aded product and user from DB)
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Documentation
- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Or see `swagger-output.json` for OpenAPI spec.

## Database Initialization
- The database will be initialized automatically on first run using the following schemas:

### User Schema
```
username: String (unique, required)
password: String (required, hashed)
```

### Product Schema
```
name: String (required)
type: String (required)
sku: String (unique, required)
image_url: String (required)
description: String (required)
quantity: Number (required)
price: Number (required)
```

No manual migration is needed; Mongoose will create collections as needed.

## Running Tests
- See `test_api.py` for example API tests and usage. 
