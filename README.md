# Agora

Agora-B is a back-end server application built with Node.js and Express. This project was previously using Epayco for payment processing and Busboy for file uploading, both of which have been migrated to Stripe and Multer respectively. The database models for MongoDB Atlas have been refactored for better functionality. Additionally, Morgan development middleware has been added for improved development experience.

## Tech Stack

- **Node.js & Express.js**: Fast, unopinionated, minimalist web framework for Node.js for building servers.
- **Stripe**: A suite of payment APIs that powers commerce for businesses of all sizes.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, primarily used for uploading files.
- **jsonwebtoken**: An implementation of JSON Web Tokens.
- **morgan**: HTTP request logger middleware for Node.js.
- **Cloudinary**: A cloud-based image and video management service.
- **SendGrid**: Customer communication platform for transactional and marketing email.

## Installation

To get started with this project:

1. **Clone the repository**: git clone https://github.com/Nicolas-Rodriguez-Ch/agora-tutorships-server

2. **Navigate into the directory**: cd Agora-B

3. **Install the dependencies**: npm install

4. **Create a `.env` file and add your environment variables**: touch .env

Open the `.env` file and add the following (replace the values with your own):

PORT=3001
SECRET_KEY=your_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
ATLAS_URI=your_atlas_uri
CLOUDINARY_URL=your_cloudinary_url

5. **Run the application**:
   In development mode: npm run nodemon

In production mode: npm run start

## Operation Instructions

To start the application in development mode, run `npm run nodemon`. This will start the application on `http://localhost:3001` (or your custom port if you've set one).

To start the application in production mode, run `npm run start`.

This application uses Stripe for payment processing, so make sure you have valid Stripe keys.