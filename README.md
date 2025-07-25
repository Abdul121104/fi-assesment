# Inventory Management Tool – Fi Assessment

A full-stack inventory management system developed as part of the Fi Money technical assessment. The system supports user authentication and allows users to manage products including adding new products, editing inventory quantities, and viewing analytics.

---

## Assumptions Made

- Only **authenticated users** can access the product management dashboard.
- Users are assumed to be staff/admin-type users, so **role-based access** was not implemented.
- Product fields like `name`, `type`, `SKU`, `image URL`, `description`, `quantity`, and `price` are all mandatory.
- Api are not called in batches 
- No file/image upload system was used — only **image URLs** are accepted.
- Analytics shown include:
  - Most recently added product
  - Product count
  - Highest and lowest quantity product

---

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Auth:** JWT-based authentication
- **API Docs:** Swagger UI
- **State Management:** useState, useEffect (React hooks)

---

## Use of AI in Development

This project leverages AI tools (e.g., ChatGPT,gemini,github co-pilot) in the following areas:

### Debugging Assistance
- Identifying re-rendering and focus loss issues in controlled React components.
- Resolving state-related bugs (e.g., `useEffect` dependency misbehavior).

### Error Handling Strategy
- Improving JWT-related error messaging.
- Creating reusable error wrappers for async API handlers.

### API Documentation
- Setup and refinement of **Swagger UI** for clean API documentation in the backend (`/api-docs`).
- Auto-generating route descriptions and expected error formats.

### UI/UX Enhancement
- Form structure and layout designed based on AI feedback for better user experience and accessibility.

### Readme Enhancement
- creation of a well documented readme and proper steps.|

### Project Structure Improvemet
- getting a rough idea of the project file structure and key parameters that are to be implemented.


---

### Project Structure

- `frontend/` – React + Vite frontend
- `backend/` – Node.js + Express + MongoDB backend

>  Installation steps are provided in the respective `README.md` files inside each directory.


