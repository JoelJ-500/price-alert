const { spawn } = require('child_process');

function updatePrices() {
  // Spawn a child process to run the Scrapy spider
  const scraper = spawn('scrapy', ['crawl', 'price_spider'], { cwd: '../price_tracker_scraper' });

  scraper.stdout.on('data', (data) => {
    console.log(`Scraper Output: ${data}`);
  });

  scraper.stderr.on('data', (data) => {
    console.error(`Scraper Error: ${data}`);
  });

  scraper.on('close', (code) => {
    console.log(`Scraper process exited with code ${code}`);
  });
}

//Add the email alert system when price changes
const sendPriceAlert = require('./sendPriceAlert');

async function updatePrices(userId) {
  const user = await User.findById(userId);
  const products = await Product.find({ _id: { $in: user.trackedProducts } });

  products.forEach(product => {
    const lastPrice = product.priceHistory[product.priceHistory.length - 1].price;
    if (product.currentPrice < lastPrice) {
      sendPriceAlert(user.email, product.name, lastPrice, product.currentPrice);
    }
  });
}

module.exports = updatePrices;
