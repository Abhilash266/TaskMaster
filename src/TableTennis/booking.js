const puppeteer = require('puppeteer');

async function autoLogin() {
  try {
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();
    await page.goto('https://apex.residentservice.com/#/signin');

    // Wait for the email and password fields to appear
    await page.waitForSelector('#signin_identification');
    await page.waitForSelector('#password');

    // Fill in the email and password fields
    await page.type('#signin_identification', 'nishanthjambur@gmail.com');
    await page.type('#password', 'Blrboys!123');

    // Submit the login form
    await page.click('.sp-button');
    console.log('Login successful!');

    // Click anchor tag
    await page.waitForSelector('a[aria-label="Request Service"]');
    await Promise.all([
      page.waitForNavigation(), 
      page.click('a[aria-label="Request Service"]'),
    ]);
    console.log('Anchor tag clicked!');

    // Button OK
    await page.waitForSelector('button[aria-label="OK"]');
    await page.click('button[aria-label="OK"]');
    console.log('Button clicked!');
    
    // Request form
    await page.waitForSelector('.request-form');
    await page.waitForTimeout(2000);
    // Add Message
    await page.waitForSelector('textarea[aria-label="Describe your service request"]');
    await page.type('textarea[aria-label="Describe your service request"]', 'fob number: 32939 Please give access to game room (Table Tennis).');
    console.log('Textarea filled!');
    await page.waitForTimeout(2000);
    
    // Choose category
    await page.waitForSelector('select#category');
    await page.select('select#category', '57f8ce95-3ecb-4edd-8d75-872565a863f6');
    console.log('Category selected!');
    await page.waitForTimeout(2000);
    
    // Choose sub-category
    await page.waitForSelector('select#subcategory');
    await page.select('select#subcategory', '3d93ecb1-ea09-49f8-a8ef-c582c9c088be');
    console.log('SubCategory selected!');
    await page.waitForTimeout(2000);
  
    // Submit Request
    await page.waitForSelector('button[aria-label="Submit Request"]');
    await page.click('button[aria-label="Submit Request"]');
    console.log('Request Submitted');



  } catch (error) {
    console.error('Login failed:', error);
  } 
}

autoLogin();
