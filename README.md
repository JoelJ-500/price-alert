# Price Tracker Web Application

## Project Overview

The Price Tracker is a web application designed to help users track the prices of various products across multiple retailers (for now only Amazon, BestBuy, and Costco). The app allows users to monitor price changes, view historical price data, and receive alerts when the price of a tracked product changes.

## Features

- **User Authentication**: Secure user registration and login with password encryption.
- **Product Tracking**: Track products by entering a product link from supported retailers.
- **Price History**: View the historical price data of tracked products.
- **Custom Alerts**: Set custom time intervals to receive price alerts.
- **Dashboard**: Manage all tracked products in a centralized dashboard.
- **Scrapy Integration**: Utilizes Scrapy to scrape real-time prices from retailer websites.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Action Plan
- **Backend Development**: Utilized **Node.js and Express.js** to build a RESTful API that handled user authentication (JWT), managed product tracking data, and interfaced with **MongoDB for data storage**. Implemented robust services to periodically **scrape product prices using Scrapy, directly integrating the data into MongoDB**.

- **Frontend Development**: Developed the user interface with **React.js**, creating dynamic components such as a Dashboard for managing tracked products, a Product Page to display price histories with data visualizations, and a responsive Sidebar for easy navigation.

- **Data Integration**: Engineered a seamless connection between the backend and frontend, enabling real-time updates and data retrieval. Implemented a Price Updater Service that allowed users to set custom intervals (1 hour, 6 hours, 12 hours, 1 day) for receiving price alerts, ensuring that the users were always informed about price changes.

- **Scrapy Spider Development**: Created a Scrapy Spider to scrape real-time prices from multiple retailers, handling various complexities such as DOM changes and API calls for data extraction. The spider was optimized for efficiency and accuracy, ensuring the latest price data was always available to users.

- **Security**: Ensured secure data handling and implemented authentication measures using bcrypt for password encryption.

## Project Architecture

### Front-end

The front-end of the application is built with React and consists of the following components:

- **Sidebar**: Contains links to the dashboard and product pages.
- **Dashboard**: Displays all tracked products in a table format.
- **Product Page**: Shows detailed information about each tracked product, including a graph of its price history.
- **Top Bar**: Includes a search bar, settings, and user login/logout functionality.

### Back-end

The back-end is built with Node.js and Express.js, handling the following:

- **User Authentication**: Managed via JWT and bcrypt for secure password handling.
- **API Routes**: Exposes endpoints for managing products, users, and price updates.
- **Price Updater Service**: Periodically updates product prices based on user-defined intervals.

### Databases

The application uses MongoDB to store:

- **Users**: Usernames, passwords, tracked products, and alert settings.
- **Products**: Product details, including price history and tracking users.

### Price Scraper

A Scrapy spider is used to scrape product prices from supported retailers. The spider fetches price data and updates the MongoDB database directly.
