import scrapy

class PriceSpider(scrapy.Spider):
    name = 'price_spider'

    def start_requests(self):
        urls = [
            'https://example.com/product-page-1',
            'https://example.com/product-page-2',
            # Make spider look at all products in database to go through
            # Modify this spider to store data directly to MongoDB from here
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        product_name = response.css('h1::text').get()  # Put DOM location of product name here
        price = response.css('.price::text').get()  # Put DOM location of price here

        yield {
            'product_name': product_name,
            'price': price,
            'url': response.url
        }
