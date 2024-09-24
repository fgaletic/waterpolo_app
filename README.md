# Waterpolo Team E-Commerce App
=====================================

### Overview

This repository contains the code for the MVP for the Waterpolo Team E-Commerce App, a React-based e-commerce application built using Node.js, Express.js, and MongoDB.

### Features

#### Frontend

* Built using React.js, React Context API, and Material-UI
* Features:
	+ **Product Listing Page**
	+ **Product Detail Page**
	+ **Cart**
	+ **Checkout Process**

#### Backend

* Built using Node.js and Express.js for server-side logic
* Includes APIs for:
	+ **Product Listing**
	+ **Cart Management**
* Uses MongoDB for data storage, currently only for products
* Utilizes Mongoose as an Object Data Modeling (ODM) library for MongoDB and Node.js

#### Payment

* Payment gateway using Stripe has been implemented

### Technologies Used

* **React.js**
* **React Context API**
* **Material-UI**
* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Stripe**

### Getting Started

To get started with the application, follow these steps:

1. Clone the repository: `git clone https://github.com/[your-username]/waterpolo-team-e-commerce-app.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

### Environment Variables

To run the application, you'll need to create a `.env` file in the root of the project. You can use the `.env.example` file as a template.

Create a new file named `.env` and fill in the values for each variable. For example:

* `MONGODB_URI=your_mongodb_uri`
* `PORT=your_port`
* `STRIPE_SECRET_KEY=your_stripe_secret_key`

Make sure to replace the placeholder values with your own credentials and secrets, or the ones you were provided with.

**Note:** Do not commit your `.env` file to the repository, as it contains sensitive information.

### Next Steps

Now that the Minimum Viable Product (MVP) has been built, we can focus on enhancing and expanding its features. The following tasks are still to be completed:

* Implementing user authentication and order processing APIs
* Implementing JWT for user authentication and authorization
* Deploying the application on cloud-based services
* Enhancing the overall security features of the application
* Expanding MongoDB to store information about users, orders, etc.

These tasks will help take the application to the next level, providing a more robust and scalable solution.
