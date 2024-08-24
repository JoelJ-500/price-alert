import scrapy
import requests
from pymongo import MongoClient

class PriceSpider(scrapy.Spider):
    name = 'price_spider'

    def start_requests(self):
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        db = client['price_tracker']
        products = db.products.find()

        for product in products:
            yield scrapy.Request(url=product['productLink'], callback=self.parse, meta={'product': product})

    def parse(self, response):
        product = response.meta['product']
        retailer = response.url

        if 'amazon' in retailer:
            price = response.css('#priceblock_ourprice::text').get()
        elif 'bestbuy' in retailer:
            price = response.css('.priceView-customer-price span::text').get()
        elif 'costco' in retailer:
            price = response.css('.your-price span::text').get()

        if not price:
            # Attempt to find the price using a backup method or API
            price = self.get_price_from_api(response.url)
            if not price:
                # Log the issue for manual review
                self.log(f'Price element not found for {product["productLink"]}')
                return
        
        product['currentPrice'] = price
        product['priceHistory'].append({'price': price})
        db = MongoClient('mongodb://localhost:27017/')['price_tracker']
        db.products.update_one({'_id': product['_id']}, {'$set': product})

# Add api calls if DOM location fails
def get_price_from_api(self, url):
    # Placeholder function for API price fetching
    # Implement actual API calls if available
    return None
