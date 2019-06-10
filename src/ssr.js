const puppeteer = require('puppeteer')

async function ssr(url) {
  console.info('Rendering the page in SSR mode')
  
  // We launch headless browser
  const browser = await puppeteer.launch()

  // We wait for the page load on the headless browser
  const page = await browser.newPage()

  try {
    // Wait until network is done on the headless browser
    await page.goto(url, {waitUntil: 'networkidle0'})
    
    // Wait for the selector to load, then crawling
    await page.waitForSelector('.comments-list')
  }
  catch(err) {
    throw new Error('Something happened on server')
  }
  
  // Wait browser content to load
  const html = await page.content()

  // Close the headless browser
  await browser.close()

  return {
    html
  }
}

module.exports = ssr