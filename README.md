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
