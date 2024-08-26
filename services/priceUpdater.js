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

module.exports = updatePrices;
