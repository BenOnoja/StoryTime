Here’s a `README.md` file template for your project:

---

# Telegram Mini App - PERN Stack

This repository contains a **Telegram Mini App** built using the **PERN stack** (PostgreSQL, Express, React, Node.js). The project consists of a frontend built with React (CRA template) and a backend powered by Express and PostgreSQL.

---

## **Clone the Repository**

To clone this repository and set it up locally, follow these steps:

1. Open your terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/BenOnoja/StoryTime.git
   ```
3. Navigate to the project folder:
   ```bash
   cd StoryTime
   ```

---

## **Project Use**

This project is a **Telegram Mini App** that allows users to:
- **Interact with Telegram APIs** for user authentication and data fetching.
- **Perform CRUD operations** on books, users, and transactions using a PostgreSQL database.
- **Enable Buyers and Sellers** to connect and trade books within the app.
- Utilize a **React-based frontend** and an **Express-powered backend** for seamless functionality.

---

## **Folder Structure**

- **`bookstore/`**: Contains the React frontend for the Telegram Mini App.
- **`backend/`**: Contains the Express backend and API logic.

---
Remember to create .env files in the backend and bookstore/src/components/ folders respectively.
---
## *backend/.env**
```text
DB_USER='your user name'
DB_HOST=localhost
DB_PASSWORD='password goes here'
DB_NAME='database name'
DB_PORT=5432
PAYSTACK_SECRET_KEY='secret key for paystack transaction (test)'
```
---
## *bookstore/src/component/.env**
```text
REACT_APP_PAYSTACK_PUBLIC_KEY='react app public key'
```
--- 