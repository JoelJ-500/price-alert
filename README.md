App architecture:

Front-end (Dynamic page that updates periodically by making requests to Mediator):
- Sidebar:
  - Link to the dashboard
  - Every other element in the sidebar is a link to the specific product page.

- Main Window, right of sidebar: Hosts the dashboard or selected product being tracked
  - Dashboard: 
    - Contains a table of tracked products. 
    - The product with the latest price change is on the top of the table.

    - Row Format:
      - Name(Links to product page or product source), 
      - Original Price, Current Price, # Price Changes
      - Percent change compared to original price
  
  - Product Page: Information on tracked product
    - Contains name, original price, current price, #Price Changes.
    - Graph of the price
    - Table of time intervals where the price of the specific product, has changed.
    - Row of Table:
      - Time of price change.
      - New Price
      - Prev Price
      - % of change, compard to the previous time change

- Top Bar:
  - Icon of website: Links to Dashboard
  - Next to icon: Search bar to search tracked products
  - Far Right of Top Bar:
    - Settings: Change alerting email etc. 
    - User login- dropdown containing login or registration

Back-end:

*Alot of the data need by front end, can be calculated by the client itself, based on the price history given by 
product database. This saves computing resources on server.

Mediator(Model View Controller): handles interactions between front end and user database- getters and setters of database

Databases:
- User: 
  - Username and Password (Store this with encryption)
  - Products being tracked by user- Search keys used to find the specific product in the 'Products' database.
  - Email(s) to send alerts to. 
  - Any other misc user settings
- Products:
  - 'Search key' that user database uses to find product: 
    - Product Link: link to retailer selling product.
  - DOM tree location of price element on retailer page. 
  - Price history since the product was added to database. 
  - Updates everything above at the smallest time interval selected.
  - Users tracking the product
    - For every user: price of product when it was added to database.

Price Updater: (Only interacts with 'Products' Database)
- Updates price of every product in product database.
  - Offer time intervals: 1 hour, 6 hours, 12 hours, 1 day
  - Handle Price History Time Interval Conflicts: 
      - If the product is tracked by multiple users with different time intervals,
        it records a 'start' point that each user joined at, and only gives history from that point onwards
  - Updates DOM tree location if price not found.
- Adding or updating DOM tree location of product from product retailer web page, 
  when new product added or current DOM tree location not found. (Use API like sp-api?)
