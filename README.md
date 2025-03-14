# Full-Stack Web App with User Authentication and Payment Processing

This is a full-stack web application built with **React** and **Tailwind CSS** on the frontend, and **Node.js**, **Express**, and **MongoDB** on the backend. It includes features like **user authentication**, **payment processing**, and **bill generation**, with **Stripe** integration for secure payments.

## Key Features

### Frontend

- Built with **React** and **Tailwind CSS** for a modern, responsive UI.
- Includes reusable components like **forms**, **tables**, **modals**, and **navigation**.
- Provides a seamless user experience with smooth navigation and interactive elements.

### Backend

- Powered by **Node.js** and **Express** for robust server-side logic.
- Uses **MongoDB** for database management, storing user data, payment records, and bills.
- Implements **user authentication** for secure login and registration.

### Payment Processing

- Integrates with **Stripe** for secure and reliable payment processing.
- Dynamically generates and manages bills based on user transactions.

### Functionality

- **User Management**: Register, login, and manage user profiles.
- **Payment Processing**: Securely process payments using Stripe.
- **Bill Generation**: Automatically generate and display bills for completed transactions.

## Technologies Used

### Frontend

- React
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Stripe
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

## Installation

### Frontend

1. Navigate to the `Frontend` directory:

   ```sh
   cd Frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`.

### Backend

1. Navigate to the `Backend` directory:

   ```sh
   cd Backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `Backend` directory and add your environment variables:

   ```env
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   ```

4. Start the server:

   ```sh
   npm start
   ```

5. The backend server will run on `http://localhost:5000`.

## License

This project is licensed under the ISC License.
